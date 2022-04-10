import cookie from "cookie";

{/** Verification des informations de connexion  saisies en utilisant une cookies */}
{/** Il va nous servir à memoriser nos identifiants des utilisateurs de notre site */}
const handler = (req, res) => {
    if (req.method === "POST") {
        const {username, password } = req.body;
        if (
            username === process.env.ADMIN_USERNAME && 
            password === process.env.ADMIN_PASSWORD) {
            res.setHeader(
                "Set-Cookie", 
                cookie.serialize("token", process.env.TOKEN, {
              maxAge: 60 * 60,
              sameSite: "strict",
              path:"/",  
            })
            );
            res.status(200).json("Succès");
        }else{
            res.status(400).json("Informations éronnées!")
        }
    }
};

export default handler;