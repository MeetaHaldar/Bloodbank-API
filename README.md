## Blood Bank API
This is a REST API server developed using NestJS for a blood bank management system. The app allows hospitals to add blood sample info and receivers to request blood samples from hospitals. Hospitals can see the list of all receivers who have requested a particular blood group from its blood bank.

### Features
- Hospital and Receiver can create an account and sign in.
- Hospitals can add all the blood samples info available.
- Receivers can request blood samples from hospitals.
- Only eligible receivers can request samples.
- Hospitals can see the list of all receivers who have requested a particular blood group from its blood bank.

### Requirements
 - Node.js
- MongoDB/Postgres database
### Installation
- Clone the repository
```
git clone https://github.com/MeetaHaldar/Bloodbank-API.git
```
- Install dependencies with
```
npm install
```
- Create a .env file based on the example .env.example file and set your environment variables
- Start the server with 
``` 
npm start
```

### Endpoints

`http://localhost:2000`

| Endpoint | Method | Description | Access |
| --- | --- | --- | --- |
| `/hospital/register` | POST | Register a new hospital account | Public |
| `/receiver/register` | POST | Register receiver account | Public |
| `/hospital/login` | POST | Login to an existing hospital | Public |
| `/receiver/login` | POST | Login to an existing receiver | Public |
| `/` | GET | Get the list of all blood samples available in all hospitals | Public |
| `/bloodSample/` | POST | Add a new blood sample info | Hospital |
| `/bloodSample/:id` | PUT | Update the respective blood sample info | Hospital |
| `/bloodSample/:id` | DELETE | Delete the respective blood sample info | Hospital |
| `/bloodSample/` | GET | Get all the blood info that the hospital uploaded | Hospital |
| `/request/` | POST | Request a blood sample | Receiver |
| `/bloodSample/allRequest` | GET | Get the list of all receivers who have requested a particular blood group from its blood bank | Hospital |

## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://meeta.dns.army/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/meeta-haldar-601b41203/?locale=en_US)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Meeta_boss)

So what are you waiting for? Get started with our amazing NestJS/ExpressJS REST API server and build your own blood bank app today! With its user-friendly interface, intuitive API endpoints, and robust tech stack, you'll be up and running in no time. Join the community of hospitals and receivers who are using our app to save lives and make a difference in the world. Happy coding!  

  <h3> If you like it , Then don't forget to Star ⭐ this repo . Thankyou... </h3>



