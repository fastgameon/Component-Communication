##State Management
####Difference between Property Bag and State Management
![](1.propertyBag&statemanagement.png)

#### Sharing Entity State

To turn a basic data access service into a state management service, we need to add a property to retain the list of entities. This property is populated the first time we retrieve the data, and any other requests for the data use this property.
![](2.stateManagementService.png)

####Keeping state in sync
one way to provide communication between two components is with a property in a service. In this case, we want a property for the currently selected product. This list component would set the property when the user selects a product, and the detail component could read this property to obtain the current selected product and display the appropriate details.
![](3.Getter.png)

####Change Detection
The change detection watches for changes to the bound property values and updates the binding when it sees any changes to those properties.

![](4.Timer.png)
