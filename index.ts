import app from './app'
import { AppDataSourde } from './connection'

async function main() {
  
  try {

    // database connection
    await AppDataSourde.initialize()
  
    // server listening
    app.listen(app.get('port'), () => console.log(`Server listen on port: ${app.get('port')}`))
  
  } catch (error) {
    console.log(error)
  }
}


main()