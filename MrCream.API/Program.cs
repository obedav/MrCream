using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() {
        Title = "MrCream API",
        Version = "v1",
        Description = "API for MrCream products - Yoghurt, Water Park, and Liqueur"
    });

    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
        Name = "Authorization",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
            ?? new[] {
                "http://localhost:3000",    // Webpack dev server
                "http://127.0.0.1:5500",   // Live Server
                "http://localhost:5173",   // Vite
                "https://localhost:7001"   // Self-reference for testing
            };

        policy.WithOrigins(allowedOrigins)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// Database Configuration (using SQL Server LocalDB for development)
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection") ??
        "Server=(localdb)\\mssqllocaldb;Database=MrCreamDb;Trusted_Connection=true;MultipleActiveResultSets=true"
    );
});

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"] ?? "MrCreamAPI",
            ValidAudience = builder.Configuration["Jwt:Audience"] ?? "MrCreamClients",
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "your-super-secret-jwt-key-for-mrcream-application-min-32-chars"))
        };
    });

// SignalR for real-time features
builder.Services.AddSignalR();

var app = builder.Build();

// Configure the HTTP request pipeline
// Enable Swagger in all environments
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MrCream API V1");
    c.RoutePrefix = "swagger";
    c.DocumentTitle = "MrCream API Documentation";
});

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowFrontend");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

// Health Check Endpoint
app.MapGet("/", () => "Welcome to MrCream API! Visit /swagger for documentation.");
app.MapGet("/health", () => new {
    Status = "Healthy",
    Timestamp = DateTime.UtcNow,
    Message = "MrCream API is running successfully!"
});

// Database initialization in development
if (app.Environment.IsDevelopment())
{
    using (var scope = app.Services.CreateScope())
    {
        try
        {
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            context.Database.EnsureCreated();
        }
        catch (Exception ex)
        {
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred creating the database.");
        }
    }
}

// Run the application
// In production, IIS will handle the hosting, so we don't specify a URL
// In development, use the URL from launchSettings.json
app.Run();

// Temporary DbContext - we'll move this to Infrastructure later
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    // Temporary - we'll add proper entities later
    public DbSet<Product> Products { get; set; }
    public DbSet<User> Users { get; set; }
}

// Temporary models - we'll move these to Core later
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // "Yoghurt", "WaterPark", "Liqueur"
    public decimal Price { get; set; }
    public string Description { get; set; } = string.Empty;
}

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public bool IsAgeVerified { get; set; }
}