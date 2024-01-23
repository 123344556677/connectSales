MedCare API
===
This is the API of MedCare Project

## Install & Dependence
- Node Js
- Mongoose

## Installation Process
- Clone the project
```
git clone https://github.com/jordon5611/Connect-Sales.git

cd Connect-Sales
```
- Install the dependence
```
npm install
```
- Run the server
``` 
npm start
```

## Directory Hierarchy
```
|—— .gitignore
|—— controllers
|    |—— admin
|        |—— getSales.js
|        |—— getUserById.js
|        |—— getUsers.js
|    |—— auth
|        |—— ChangePassword.js
|        |—— forgetPassword.js
|        |—— getUser.js
|        |—— login.js
|        |—— signup.js
|        |—— updateCnic.js
|        |—— updateInformation.js
|    |—— chat
|        |—— createChat.js
|        |—— findChat.js
|        |—— userChats.js
|    |—— message
|        |—— addMessage.js
|        |—— getMessages.js
|    |—— orders
|        |—— createOrder.js
|        |—— getCartOrder.js
|        |—— getCompletedOrder.js
|        |—— updateOrder.js
|    |—— payment
|        |—— buyProduct.js
|        |—— getPayments.js
|    |—— product
|        |—— createProduct.js
|        |—— deleteProduct.js
|        |—— updateProduct.js
|—— db
|    |—— connect.js
|—— errors
|    |—— bad-request.js
|    |—— custom-api.js
|    |—— index.js
|    |—— not-found.js
|    |—— Unauthorized.js
|—— HelpingFunctions
|    |—— nodemailer.js
|    |—— stripe.js
|—— index.js
|—— middleware
|    |—— authentication.js
|    |—— error-handler.js
|    |—— multer.js
|    |—— nodeMailer.js
|    |—— not-found.js
|    |—— Validator-MiddleWare.js
|—— models
|    |—— Chat.js
|    |—— Message.js
|    |—— Order.js
|    |—— Payment.js
|    |—— Product.js
|    |—— User.js
|—— package-lock.json
|—— package.json
|—— routes
|    |—— admin.js
|    |—— auth.js
|    |—— chat.js
|    |—— message.js
|    |—— order.js
|    |—— payment.js
|    |—— product.js
|—— uploads
|    |—— 1704817444891.pdf
|    |—— 1704817485120.pdf
|    |—— 1704820718109.pdf
|    |—— 1704824061078.pdf
|    |—— 1704824142747.pdf
|    |—— 1704824486480.pdf
|    |—— 1704825614098.pdf
|    |—— 1704825662615.pdf
|    |—— 1704826093778.pdf
|    |—— 1704826164914.pdf
|    |—— 1704870460003.pdf
|    |—— 1704872367992.pdf
```
## Code Details
### Tested Platform
- software
  ```
  OS: Debian (Jan 2024), Ubuntu
  IDE: VS Code
  Language: JavaScript
  Node: 18.14.1
  NPM: 9.8.1
  MongoDB: 4.4.6
  ```
- hardware
  ```
  CPU: Intel Xeon 6226R
  GPU: Nvidia RTX3090 (6GB)
  ```
## References
- [code-1](https://github.com/jordon5611/Connect-Sales)
  
## License
This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/jordon5611/Connect-Sales/blob/main/LICENSE) file for details

