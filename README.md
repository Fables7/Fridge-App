# Fridge-App
Frontend for my Fridge App

This Fridge app is a hobby app I am creating in order to help reduce food wastage due to food expiring without notice.

This app's goal is to show all items in the Fridge with expiry dates and quantities so there is a central place where one can easily see what the next item 
to expire is.

# Open Food Facts API
This app uses Open Food Facts' api to collect food data from their database, primarily names of products associated to their barcode, any extra information would 
be provided through my app, such as quantity (cheese slices), expiry date, Image, remaining quantity etc.

# Spoonacular API
This app will use Spoonacular's api to display recipes which includes ingredients that are in the fridge, however as I am currently using the free version, it is limited to only a few requests a day (150)

# Images
Concerning the images of the products, my app will request only image urls from official images to maintain a neater display, in addition urls will save any need for storing unnecesary 
images into the database, as urls take up much less space.

# DISCLAIMER
As this apps main target is my Family, I have not attempted to make my database robust in the sense of managing who can upload images and edit products, however if the need to update this ever arises I will fix it accordingly, but for now I have decided that it is unnecessary.

# Things to add
- What can I make page (using soon to expire food)
- Setting recurring items
- Need to buy list
- profile section with view of all joined fridges, favourited foods etc
  
# Future code updates
- Need to change to Axios and React Query instead of my existing Fetch requests to optimise app and follow better practices
- Add React JoyRide to do a help tour of the app

# Things to do
- Use Jest for testing
- Finish converting all fetch calls to react query calls
- Update tsx types instead of using any
- change px values to rem/em to enable better responsive design

# KNOWN ISSUES
- expo barcode-scanner sometimes has issues with scanning barcodes where for the same barcode it may sometimes give two different codes, one being correct and one being an error. The only solution to this is to ensure clear image of barcode. I will try and find a solution but it appears to be an issue with the expo barcode-scanner package.


https://github.com/Fables7/Fridge-App/assets/129498777/cf094b83-76ce-4909-9ed0-7d09a481d6c1

