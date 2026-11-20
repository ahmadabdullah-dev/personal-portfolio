using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDependencyInjection(builder.Configuration); 
builder.Services.AddControllers();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

await DataSeeder.SeedAsync(app.Services);

app.UseCors("AllowWeb");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();