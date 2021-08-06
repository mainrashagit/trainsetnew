import { fetchAPI } from "@/api/api"
import withSession from "@/lib/session"

// import fetchJson from "@/lib/fetchJson"

// export default withSession(async (req, res) => {
//   const { username } = await req.body
//   const url = process.env.WORDPRESS_API_URL!

//   try {
//     const { login, avatar_url: avatarUrl } = await fetchJson(url)
//     const user = { isLoggedIn: true, login, avatarUrl }
//     req.session.set("user", user)
//     await req.session.save()
//     res.json(user)
//   } catch (error) {
//     const { response: fetchResponse } = error
//     res.status(fetchResponse?.status || 500).json(error.data)
//   }
// })

// export default withSession(async (req, res) => {
//   const { username, password } = await req.body
//   const loginQuery = `
//   mutation Login {
//     login(input: {password: "${password}", username: "${username}", clientMutationId: "uniqueId"}) {
//       authToken
//     }
//   }
//   `
//   try {
//     const result = await fetchAPI(loginQuery)
//     req.session.set("token", result.login.authToken)
//     await req.session.save()
//     // res.json(user)
//     res.send("success")
//   } catch (error) {
//     const { response: fetchResponse } = error
//     res.status(fetchResponse?.status || 500).json(error.data)
//   }
// })
