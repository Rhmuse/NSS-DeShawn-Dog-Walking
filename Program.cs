using DeShawnsDogWalking.Models;

List<Walker> walkers = new List<Walker>
{
    new Walker { Id = 1, Name = "John" },
    new Walker { Id = 2, Name = "Emily" },
    new Walker { Id = 3, Name = "Michael" }
};

List<City> cities = new List<City>
{
    new City { Id = 1, Name = "New York" },
    new City { Id = 2, Name = "Los Angeles" },
    new City { Id = 3, Name = "Chicago" }
};

List<Dog> dogs = new List<Dog>
{
    new Dog { Id = 1, Name = "Max", CityId = 1, WalkerId = 1 },
    new Dog { Id = 2, Name = "Bella", CityId = 2, WalkerId = 2 },
    new Dog { Id = 3, Name = "Charlie", CityId = 1, WalkerId = 1 },
    new Dog { Id = 4, Name = "Lucy", CityId = 3, WalkerId = 3 },
    new Dog { Id = 5, Name = "Rocky", CityId = 2, WalkerId = 0 },
    new Dog { Id = 6, Name = "Luna", CityId = 3, WalkerId = 0 }
};

List<WalkerCity> walkerCities = new List<WalkerCity>
{
    new WalkerCity { Id = 1, CityId = 1, WalkerId = 1 },
    new WalkerCity { Id = 2, CityId = 2, WalkerId = 2 },
    new WalkerCity { Id = 3, CityId = 1, WalkerId = 3 },
    new WalkerCity { Id = 4, CityId = 3, WalkerId = 1 }
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Dogs
app.MapGet("api/dogs", () =>
{
    dogs.ForEach(d =>
    {
        d.City ??= cities.FirstOrDefault(c => c.Id == d.CityId);
        d.Walker ??= walkers.FirstOrDefault(w => w.Id == d.WalkerId);
    });
    return dogs;
});

app.MapGet("api/dogs/{dogId}", (int dogId) =>
{
    Dog foundDog = dogs.FirstOrDefault(d => d.Id == dogId);
    if (foundDog == null) return Results.NotFound();
    foundDog.Walker ??= walkers.FirstOrDefault(w => w.Id == foundDog.WalkerId);
    foundDog.City ??= cities.FirstOrDefault(c => c.Id == foundDog.CityId);
    return Results.Ok(foundDog);
});

// iterator for dogIds
int dogId = 7;

app.MapPost("api/dogs", (Dog dog) =>
{
    dog.Id = dogId;
    dogs.Add(dog);
    dogId++;
    return Results.Json(dog);
});

app.MapPut("api/dogs/{dogId}", (Dog dog, int dogId) =>
{
    Dog foundDog = dogs.FirstOrDefault(d => d.Id == dogId);
    if (foundDog == null) return Results.BadRequest();
    foundDog.CityId = dog.CityId;
    foundDog.Name = dog.Name;
    foundDog.WalkerId = dog.WalkerId;
    foundDog.City = dog.City;
    foundDog.Walker = dog.Walker;
    return Results.Ok(foundDog);
});

app.MapDelete("api/dogs/{dogid}", (int dogId) =>
{
    Dog foundDog = dogs.FirstOrDefault(d => d.Id == dogId);
    if (foundDog == null) return Results.BadRequest();
    dogs.Remove(foundDog);
    return Results.Ok();
});

// Cities


app.MapGet("api/cities", () =>
{
    return cities;
});

//iterator for cityId
int cityId = 4;

app.MapPost("api/cities", (City city) =>
{
    if (city == null) return Results.BadRequest();
    city.Id = cityId;
    cities.Add(city);
    cityId++;
    return Results.Ok(city);
});
// Walkers

app.MapGet("api/walkers", () =>
{
    walkers.ForEach(w =>
    {
        w.Cities = new List<City>();
        walkerCities.ForEach(wc =>
        {
            if (wc.WalkerId == w.Id)
            {
                City foundCity = cities.FirstOrDefault(c => c.Id == wc.CityId);
                if (foundCity != null) w.Cities.Add(foundCity);
            }
        });
    });

    return walkers;
});

app.MapDelete("api/walkers/{walkerId}", (int walkerId) =>
{
    Walker foundWalker = walkers.FirstOrDefault(w => w.Id == walkerId);
    if (foundWalker == null) return Results.BadRequest();
    foreach (Dog dog in dogs)
    {
        if (dog.WalkerId == walkerId)
        {
            dog.WalkerId = 0;
            dog.Walker = null;
        }
    }
    walkers.Remove(foundWalker);
    return Results.Ok();
});

//WalkerCity iterator
int walkerCityId = 5;

app.MapPut("api/walkers/{walkerId}", (WalkerUpdateDTO walkerUpdate, int walkerId) =>
{
    List<WalkerCity> currentWalkerCities = new List<WalkerCity>();
    List<WalkerCity> walkerCitiesToAdd = new List<WalkerCity>();

    foreach (int cityId in walkerUpdate.CityIds)
    {
        foreach (WalkerCity walkerCity in walkerCities)
        {
            if (walkerCity.CityId == cityId && walkerCity.WalkerId == walkerId)
            {

            }
            else
            {
                WalkerCity walkerCityToAdd = new WalkerCity()
                {
                    CityId = cityId,
                    WalkerId = walkerId,
                    Id = walkerCityId
                };
                walkerCitiesToAdd.Add(walkerCityToAdd);
                walkerCityId++;
            }
        }
    }

    walkerCitiesToAdd.ForEach(wc => walkerCities.Add(wc));

    List<WalkerCity> foundWalkerCities = walkerCities.Where(wc => wc.WalkerId == walkerId).ToList();


    foreach (int cityId in walkerUpdate.CityIds)
    {
        WalkerCity foundWalkerCity = foundWalkerCities.FirstOrDefault(wc => wc.CityId == cityId);
        if (foundWalkerCity != null) foundWalkerCities.Remove(foundWalkerCity);
    }

    foreach (WalkerCity walkerCity in foundWalkerCities)
    {
        walkerCities.Remove(walkerCity);
    }
    Walker foundWalker = walkers.FirstOrDefault(w => w.Id == walkerId);
    foundWalker.Name = walkerUpdate.Name;
    return Results.Ok(foundWalker);
});

app.Run();
