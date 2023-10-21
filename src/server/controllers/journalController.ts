import { Timestamp } from "typeorm";
import { Journal } from "../entity/Journal";
import { User } from "../entity/User";
import { submitOpenAiRequest } from "./openAiController";

type JournalProps = {
  userId?: string;
  entry: string;
  timestamp: string;
  date: string;
  summary: string;
};

const saveJournalEntry = async ({
  userId,
  entry,
  timestamp,
  date,
  summary,
}: JournalProps) => {
  // TODO: this should be one query, need to change this
  /*
    SELECT * from "user" u 
    LEFT JOIN journal j ON u.id = j."userId" 
    WHERE u.email = 'myEmail@gmail.com'
    AND ( j.localDateFromBrowser = :date OR j."localDateFromBrowser" IS NULL)

  */
  let userQuery = User.createQueryBuilder("u")
    .leftJoinAndSelect("u.journals", "j")
    .where("u.id = :id", { id: userId })
    .getOne();

  let journalQuery = Journal.createQueryBuilder("j")
    .leftJoin("j.user", "u")
    .where("j.localDateFromBrowser = :date", { date })
    .andWhere("u.id = :id", { id: userId })
    .getOne();

  let [user, journal] = await Promise.all([userQuery, journalQuery]);

  if (!journal) journal = new Journal();
  journal.localDateFromBrowser = date;
  journal.summary = summary;
  journal.timestamp = timestamp;
  journal.entry = entry;
  journal.user = user;
  await Journal.save(journal);
};

const timeFrameToLength = {
  week: 7,
  month: 30,
  year: 365,
};
const getJournalEntries = async ({ user, timeFrame }: any) => {
  var date = new Date();
  var oneWeekAgo = date.setDate(date.getDate() - timeFrameToLength[timeFrame]);

  let userJournals = await User.createQueryBuilder("u")
    .leftJoinAndSelect("u.journals", "j")
    .where("u.id = :id", { id: user.id })
    .andWhere("j.localDateFromBrowser >= :oneWeekAgo", { oneWeekAgo })
    .getOne();

  return userJournals?.journals;
};

export const handleJournalPost = async ({ userId, entry, timestamp, date }) => {
  const prompt = process.env.OPEN_AI_PROMPT ?? "summarize this:"
  const responseText = await submitOpenAiRequest({userId, entry, prompt});
  await saveJournalEntry({
    userId,
    entry,
    timestamp,
    date,
    summary: responseText,
  });
  return responseText;
};

const minimum = {
  week: 1,
  month: 3,
  year: 10,
};
export const handleSummaryPost = async ({ user, timeFrame }) => {
  const journalEntries = await getJournalEntries({ user, timeFrame });
  const belowMinimum = !journalEntries || journalEntries.length < minimum[timeFrame];
  if (belowMinimum)
    return {
      summary: `You need more journal entries before we can generate a theme for your last ${timeFrame}`,
      timeFrame,
    };

  const journalSummaries = journalEntries.reduce((acc, journal) => {
    return acc + (journal.summary ?? "");
  }, "");

  const prompt = process.env.OPEN_AI_PROMPT_2 ?? "summarize this:"
  let chunks = journalSummaries.match(/.{1,5004}/g);
  let partialSummary = "";
  for (let chunk of chunks) {
    if(partialSummary.length > 5000) break;
    partialSummary += await submitOpenAiRequest({userId: user.id, entry: chunk, prompt});
  }
  const summary = await submitOpenAiRequest({userId: user.id, entry: partialSummary, prompt});;
  return { summary, timeFrame };
};

export const handleJournalGet = async ({ userId }) => {
  let user = await User.createQueryBuilder("u")
    .leftJoinAndSelect("u.journals", "j")
    .where("u.id = :id", { id: userId })
    .getOne();
  return user.journals;
};
