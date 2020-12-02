import {createServer, Model, Request} from "miragejs";

// Server.
const createMockServer = function() {
    createServer({
        models:{
            user: Model
        },
        routes(){
            this.get('/diaries/users',(schema:any)=>{
                return schema.db.users
            })
            this.post("/diaries/users/create", (schema:any,request:Request)=>{
                console.log("User data on sign up")
                console.log(request.requestBody)
                schema.db.users.create(request.requestBody)
                return {
                    status: true,
                    resCode: 200,
                    message: "User created successfully",
                    isError:false
                }
            })
        }
    })
}

export default createMockServer