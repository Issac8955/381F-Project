# 381F-Project Group 5 Inventory Management System
## Group Info
Group No.: 5

Group Members:  Cheng Tsz Tsun  (12668285)  Lo Pak Sam      (13091092)

## Render Link of Our Project

https://s381f-project-group5.onrender.com

## System Function
1. Login / Logout
2. Inventory item shown on the main page (Read)
3. Create a New Inventory item (Four Input details: ID, Name, Type, Quantity)
4. Update an existing Inventory item
5. Delete an existing Inventory item
6. RESTful API for Create/Read/Update/Delete

# CRUD Services

## 1. Login
If the URL is localhost://8099/ => Redirected to the Login Page

For login testcase: {username: 'Issac', password: 'Issac'},
	{username: 'Sam', password:'Sam'},
	{username: 'guest', password: 'guest'}

Click the `Login` Button after filling in Username and Password
 
Case: Login successfully   Action: A cookie is recorded and directed to the Main Page

Case: Login unsuccessfully  Action: Directed back to Login Page

## 2. Logout
If the `Logout` button on the Main Page is clicked => The cookie is cleared and directed to the Login Page

## 3. Create a New Inventory item
1. Click the `Create` Button on the Main Page
2. Fill in the form with ID, Name, Type, and Quantity
3. Click the `Create` Button after filling in the form
4. If the user wants to back to the Main Page, Click the `Back to home` Button
5. After a Successful Creation, the User will be back to the Main Page and the newly created item should be shown in the table

## 4. Update an existing Inventory item
1. Click the `Update` Button on the corresponding item row
2. Update Any instance of the item
3. Click the `Update` Button after updating
4. After a Successful Update, the User will be back to the Main Page and the updated item should be shown in the table with updated data

## 5. Delete an existing Inventory item
1. Click the `Delete` Button on the corresponding item row
2. The corresponding item should be deleted and does not exist in the table (It takes time for deletion/ Click `Delete` one more time if the deletion is not performed)

# RESTful Services

## 1. Read / Search API
1. For Browser (Render): Input `https://s381f-project-group5.onrender.com/api/inventory/inv_id` in the URL Part, Please Replace `inv_id` with the Inventory ID that would like to Search/ Read
For example: `https://s381f-project-group5.onrender.com/api/inventory/BK001` is finding an inventory item with ID: BK001
2. For Browser (localhost): Input `https://localhost:8099/api/inventory/inv_id`
3. For Command Line Tool(Windows CMD/ Git Bash/ Ubuntu with Render): Input `curl -v GET https://localhost:8099/api/inventory/inv_id`
4. It should return a JSON Object of the inventory item with the corresponding ID

## 2. Create API
1.  For Command Line Tool(localhost): Input `curl -X POST -H 'Content-Type: application/json' -d '{"inv_id":"BK1000","inv_name": "Pascal", "inv_type": "Book", "quantity":50}' -i http://localhost:8099/api/inventory`
2.  For Command Line Tool(Window CMD with Render): Input `curl -X POST -H "Content-Type: application/json" -d "{\"inv_id\":\"BK1000\",\"inv_name\":\"Pascal\",\"inv_type\":\"Book\",\"quantity\":50}" https://s381f-project-group5.onrender.com/api/inventory`
3.  For Command Line Tool (Git Bash/ Ubuntu with Render): Input `curl -X POST -H 'Content-Type: application/json' -d '{"inv_id":"BK1000","inv_name": "Pascal", "inv_type": "Book", "quantity":50}' -i https://s381f-project-group5.onrender.com/api/inventory`
4.  It will create an item with ID: BK1000, Name: Pascal, Type: Book, Quantity: 50

## 3. Update API
1.  For Command Line Tool(localhost): Input `curl -v -X PUT -H "Content-Type: application/json" -d '{"inv_id":"BK1000","inv_name": "Pascal", "inv_type": "Book", "quantity":49}' -i http://localhost:8099/api/inventory/BK1000`
2.  For Command Line Tool(Render): Input `curl -v -X PUT -H "Content-Type: application/json" -d "{\"inv_id\":\"BK1000\",\"inv_name\":\"Pascal\",\"inv_type\":\"Book\",\"quantity\":49}" https://s381f-project-group5.onrender.com/api/inventory/BK4000}' -i https://s381f-project-group5.onrender.com/api/inventory/BK1000`
3.  For Command Line Tool (Git Bash/ Ubuntu with Render): Input `curl -v -X POST -H 'Content-Type: application/json' -d '{"inv_id":"BK1000","inv_name": "Pascal", "inv_type": "Book", "quantity":49}' https://s381f-project-group5.onrender.com/api/inventory`
4.  It will update the quantity of the item with ID: BK1000

## 4. Delete API
1. For Command Line Tool(localhost): Input `curl-X DELETE http://localhost:8099/api/inventory/BK1000`
2. For Command Line Tool(Windows CMD/ Git Bash/ Ubuntu with Render): Input `curl-X DELETE https://s381f-project-group5.onrender.com/api/inventory/BK1000`
3. It will delete the item with ID: BK1000
