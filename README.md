# Express / mongoose file structure generator


## Usage
```
npm install -g janio  
janio user
```  
or to skip installation phase
```
npx janio user
```  
This will generate 4 files:
- ./controllers/user.controller.js
- ./routes/user.route.js
- ./services/user.service.js
- ./models/user.model.js

**user.controller.js** Will contain route logic and call services if necessary  
**user.route.js** Will contain route definition, hooks and route rôle management  
**user.service.js** Will contain specific logic ex: db access  
**user.model.js** Will contain mongoose model definition  
