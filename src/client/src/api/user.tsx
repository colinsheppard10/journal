import { wrappedAxios } from "../context/authenticate";

export const signIn = async ({payload, callback}: any) => {
  return wrappedAxios()
    .post("/public/signin", payload)
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}

export const signUp = async ({payload, callback}: any) => {
  return wrappedAxios()
    .post("/public/signup", payload)
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}

export const verifyUser = async ({payload, callback}: any) => {
  return wrappedAxios()
    .post("/public/verify", payload)
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}

export const forgotPassword = async ({payload, callback}: any) => {
  return wrappedAxios()
    .post("/public/forgot", payload)
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}

export const resetPassword = async ({payload, callback}: any) => {
  return wrappedAxios()
    .post("/public/reset", payload)
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}

export const getUser = async () => {
  try {
    let response = await wrappedAxios().post("/api/user/get", {})
    let user = response.data?.user
    return user;
  } catch (error) {
    console.error(error)
  }
}

export const getJournal = async ({callback}:any) => {
    return wrappedAxios()
    .post("/api/journal/get", {})
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}

export const createJournal = async ({payload, callback}: any) => {
    return  wrappedAxios()
      .post("/api/journal/create", payload)
      .then(callback)
      .catch(function (error: any) {
        console.error(error)
      })
}

export const createSummary = async ({payload, callback}: any) => {
  return  wrappedAxios()
    .post("/api/summary/create", payload)
    .then(callback)
    .catch(function (error: any) {
      console.error(error)
    })
}
