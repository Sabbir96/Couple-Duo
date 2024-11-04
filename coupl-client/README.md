# Duo

## Generate Component

`ng g c [componentName] --export`

## Generate Component in same folder

`ng g c [componentName] --flat`

## Generate Component as stand alone 

`ng g c [componentName] --export --standalone`

## Generate Module with routing

`ng g m [moduleName] --routing`

## Generate Service file

`ng g s [serviceName]`

## Generate Service file with out test file

`ng g s [serviceName] --skip-tests --dry-run`

{
"first_name": "For",
"last_name": "Checking",
"email_address": "forchecking@example.com",
"phone_number": "1234567890", // Must be a 10-digit number
"date_of_birth": "1990-01-01", // Must be in YYYY-MM-DD format and less than 130 years old
"citizenship": "US", // ISO 3166-1 alpha-2 country code, 2 characters
"pin": "123456",
"physical_address": {
"street_line_1": "123 Main St",
"street_line_2": "Apt 4",
"city": "Anytown",
"state": "Anystate",
"postal_code": "12345"
}
