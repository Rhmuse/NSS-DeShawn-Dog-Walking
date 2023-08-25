# DeShawn's Dog Walking

table Walkers {
Id int pk
Name string
}

table Cities {
Id int pk
Name string
}

table Dogs {
Id int pk
Name string
CityId int [ref: > Cities.Id]
WalkerId int [ref: > Walkers.Id]
}

table WalkerCities {
Id int pk
CityId int [ref: <> Cities.Id]
WalklerId int [ref: <> Walkers.Id]
}
