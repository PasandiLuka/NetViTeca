using NetViTeca.Data;
using NetViTeca.Core.IServices;
using NetViTeca.Core.Persistencia;
using NetViTeca.Repositorios;
using NetViTeca.Api.Endpoints;
using NetViTeca.Repositories;
using NetViTeca.Services;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Data.Repositorios;
using NetViTeca.Core.Servicios;
using NetViTeca.Api.Helper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 1. Obtiene la cadena de conexión
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// 👇 Usa ServerVersion.AutoDetect()
// Esto hace una pequeña conexión para obtener la versión automáticamente.
var serverVersion = ServerVersion.AutoDetect(connectionString); 

// 2. Registra tu DbContext
builder.Services.AddDbContext<NetViTecaDbContext>(
    options => options.UseMySql(connectionString, serverVersion)
);

// Repositorios
builder.Services.AddScoped<IRepoBiblioteca, RepoBiblioteca>();
builder.Services.AddScoped<IRepoGenero, RepoGenero>();
builder.Services.AddScoped<IRepoLibro, RepoLibro>();
builder.Services.AddScoped<IRepoUsuario, RepoUsuario>();

// Servicios
builder.Services.AddScoped<IBibliotecaService, BibliotecaService>();
builder.Services.AddScoped<IGeneroService, GeneroService>();
builder.Services.AddScoped<ILibroService, LibroService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();


var app = builder.Build();

const string sqlSeedPath = "../../../scripts/bd/MySql/00 INSERTS.sql"; // <-- RUTA AJUSTADA

app.ApplyMigrationsAndSeed(sqlSeedPath); 

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapAllEndpoints();

app.UseHttpsRedirection();

app.Run();