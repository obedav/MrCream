using Microsoft.AspNetCore.Mvc;

namespace MrCream.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LiqueurController : ControllerBase
{
    private readonly ILogger<LiqueurController> _logger;

    public LiqueurController(ILogger<LiqueurController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Verify age before accessing liqueur products (18+ required)
    /// </summary>
    [HttpPost("verify-age")]
    public ActionResult<AgeVerificationResponse> VerifyAge([FromBody] AgeVerificationRequest request)
    {
        if (request.DateOfBirth == default)
        {
            return BadRequest("Date of birth is required.");
        }

        var age = DateTime.Today.Year - request.DateOfBirth.Year;
        if (request.DateOfBirth.Date > DateTime.Today.AddYears(-age))
        {
            age--;
        }

        var isVerified = age >= 18;
        var token = isVerified ? Guid.NewGuid().ToString() : null;

        var response = new AgeVerificationResponse
        {
            IsVerified = isVerified,
            Age = age,
            VerificationToken = token,
            Message = isVerified
                ? "Age verified successfully. Welcome to Turbo Cream Liqueur!"
                : "You must be 18 or older to access liqueur products.",
            ExpiresAt = isVerified ? DateTime.UtcNow.AddHours(24) : null
        };

        if (isVerified)
        {
            _logger.LogInformation("Age verification successful for user aged {Age}", age);
        }
        else
        {
            _logger.LogWarning("Age verification failed for user aged {Age}", age);
        }

        return Ok(response);
    }

    /// <summary>
    /// Get all Turbo Cream Liqueur products (Age verification required)
    /// </summary>
    [HttpGet("products")]
    public ActionResult<IEnumerable<LiqueurProduct>> GetProducts([FromQuery] string? verificationToken = null)
    {
        // Simple token validation (in production, use proper JWT or session management)
        if (string.IsNullOrEmpty(verificationToken))
        {
            return Unauthorized(new { message = "Age verification required. Please verify your age first." });
        }

        var products = new List<LiqueurProduct>
        {
            new LiqueurProduct
            {
                Id = 1,
                Name = "Turbo Cream Liqueur Original",
                Description = "The heart of our brand – a silky-smooth cream liqueur made with premium fresh dairy cream and a refined spirit base, blended with unique African ingredients like roasted cocoa, caramel spice, and a hint of West African vanilla bean.",
                AlcoholContent = 18.0m,
                Volume = "250ml",
                Price = 8500.00m,
                Category = "Original",
                TastingNotes = new List<string> { "Silky cream", "Roasted cocoa", "Caramel spice", "West African vanilla" },
                ServingSuggestions = new List<string> { "Neat", "On the rocks", "In cocktails", "With desserts" },
                ImageUrl = "/images/liqueur/turbo-original.jpg",
                IsAvailable = true,
                IsSignature = true
            },
            new LiqueurProduct
            {
                Id = 2,
                Name = "Turbo Cream Gold Reserve",
                Description = "Premium aged cream liqueur infused with authentic African botanicals including baobab fruit, kola nut, and West African ginger. A celebration of African heritage in every sip.",
                AlcoholContent = 20.0m,
                Volume = "250ml",
                Price = 12000.00m,
                Category = "Premium",
                TastingNotes = new List<string> { "Baobab fruit", "Kola nut", "West African ginger", "Premium aged spirits" },
                ServingSuggestions = new List<string> { "Neat", "Premium cocktails", "Special occasions" },
                ImageUrl = "/images/liqueur/turbo-gold.jpg",
                IsAvailable = true,
                IsSignature = false
            },
            new LiqueurProduct
            {
                Id = 3,
                Name = "Turbo Cream Coffee Fusion",
                Description = "Rich cream liqueur blended with premium Nigerian coffee beans and hints of dark chocolate. Perfect for coffee lovers who appreciate African excellence.",
                AlcoholContent = 17.0m,
                Volume = "250ml",
                Price = 9500.00m,
                Category = "Specialty",
                TastingNotes = new List<string> { "Nigerian coffee", "Dark chocolate", "Cream", "Subtle spice" },
                ServingSuggestions = new List<string> { "In coffee", "Espresso martini", "After dinner drink" },
                ImageUrl = "/images/liqueur/turbo-coffee.jpg",
                IsAvailable = false, // Coming soon
                IsSignature = false
            }
        };

        return Ok(products);
    }

    /// <summary>
    /// Get cocktail recipes featuring Turbo Cream Liqueur
    /// </summary>
    [HttpGet("cocktails")]
    public ActionResult<IEnumerable<CocktailRecipe>> GetCocktailRecipes([FromQuery] string? verificationToken = null)
    {
        if (string.IsNullOrEmpty(verificationToken))
        {
            return Unauthorized(new { message = "Age verification required." });
        }

        var cocktails = new List<CocktailRecipe>
        {
            new CocktailRecipe
            {
                Id = 1,
                Name = "Turbo Espresso Martini",
                Description = "The signature Turbo cocktail - bold, creamy, and energizing",
                Difficulty = "Easy",
                PrepTime = "5 minutes",
                Ingredients = new List<Ingredient>
                {
                    new Ingredient { Name = "Turbo Cream Liqueur Original", Amount = "60ml" },
                    new Ingredient { Name = "Fresh espresso", Amount = "30ml" },
                    new Ingredient { Name = "Premium vodka", Amount = "30ml" },
                    new Ingredient { Name = "Simple syrup", Amount = "15ml" },
                    new Ingredient { Name = "Coffee beans", Amount = "3 beans (garnish)" }
                },
                Instructions = new List<string>
                {
                    "Add ice to cocktail shaker",
                    "Pour Turbo Cream Liqueur, espresso, vodka, and simple syrup",
                    "Shake vigorously for 15 seconds",
                    "Double strain into chilled martini glass",
                    "Garnish with 3 coffee beans",
                    "Serve immediately"
                },
                ImageUrl = "/images/cocktails/turbo-espresso-martini.jpg"
            },
            new CocktailRecipe
            {
                Id = 2,
                Name = "African Sunset",
                Description = "A tropical twist celebrating African flavors",
                Difficulty = "Medium",
                PrepTime = "8 minutes",
                Ingredients = new List<Ingredient>
                {
                    new Ingredient { Name = "Turbo Cream Liqueur Gold", Amount = "45ml" },
                    new Ingredient { Name = "Coconut rum", Amount = "30ml" },
                    new Ingredient { Name = "Pineapple juice", Amount = "60ml" },
                    new Ingredient { Name = "Lime juice", Amount = "15ml" },
                    new Ingredient { Name = "Toasted coconut flakes", Amount = "For rim" }
                },
                Instructions = new List<string>
                {
                    "Rim glass with toasted coconut flakes",
                    "Add ice to shaker",
                    "Combine all liquid ingredients",
                    "Shake well and strain over fresh ice",
                    "Garnish with pineapple wedge and lime wheel"
                },
                ImageUrl = "/images/cocktails/african-sunset.jpg"
            },
            new CocktailRecipe
            {
                Id = 3,
                Name = "Turbo White Russian",
                Description = "Classic cocktail with an African twist",
                Difficulty = "Easy",
                PrepTime = "3 minutes",
                Ingredients = new List<Ingredient>
                {
                    new Ingredient { Name = "Turbo Cream Liqueur Original", Amount = "60ml" },
                    new Ingredient { Name = "Vodka", Amount = "45ml" },
                    new Ingredient { Name = "Cold brew coffee", Amount = "30ml" }
                },
                Instructions = new List<string>
                {
                    "Fill old-fashioned glass with ice",
                    "Pour vodka and cold brew coffee",
                    "Gently float Turbo Cream Liqueur on top",
                    "Stir gently before drinking"
                },
                ImageUrl = "/images/cocktails/turbo-white-russian.jpg"
            }
        };

        return Ok(cocktails);
    }

    /// <summary>
    /// Get serving suggestions and food pairings
    /// </summary>
    [HttpGet("serving-guide")]
    public ActionResult<ServingGuide> GetServingGuide([FromQuery] string? verificationToken = null)
    {
        if (string.IsNullOrEmpty(verificationToken))
        {
            return Unauthorized(new { message = "Age verification required." });
        }

        var guide = new ServingGuide
        {
            OptimalTemperature = "Serve chilled at 6-8°C (43-46°F)",
            StorageInstructions = "Store in cool place. Refrigerate after opening. Shake well before use.",
            ServingMethods = new List<ServingMethod>
            {
                new ServingMethod
                {
                    Name = "Neat",
                    Description = "Pure Turbo experience in a small glass",
                    Occasion = "After dinner, relaxation"
                },
                new ServingMethod
                {
                    Name = "On the Rocks",
                    Description = "Over ice in an old-fashioned glass",
                    Occasion = "Evening wind-down, social gathering"
                },
                new ServingMethod
                {
                    Name = "In Coffee",
                    Description = "Add 30ml to hot coffee for luxury morning treat",
                    Occasion = "Weekend mornings, special occasions"
                },
                new ServingMethod
                {
                    Name = "With Desserts",
                    Description = "Drizzle over ice cream, cakes, or fruit",
                    Occasion = "Dinner parties, celebrations"
                }
            },
            FoodPairings = new List<FoodPairing>
            {
                new FoodPairing { Food = "Dark chocolate", Reason = "Complements cocoa notes" },
                new FoodPairing { Food = "Tiramisu", Reason = "Enhances coffee flavors" },
                new FoodPairing { Food = "Vanilla ice cream", Reason = "Classic cream combination" },
                new FoodPairing { Food = "African spiced cake", Reason = "Cultural flavor harmony" },
                new FoodPairing { Food = "Cheese platter", Reason = "Balances rich flavors" }
            },
            Occasions = new List<string>
            {
                "Romantic dinners",
                "Cultural celebrations",
                "After-dinner drinks",
                "Special toasts",
                "Weekend relaxation",
                "Premium gifting"
            }
        };

        return Ok(guide);
    }

    /// <summary>
    /// Place order for Turbo Cream Liqueur products
    /// </summary>
    [HttpPost("order")]
    public ActionResult<LiqueurOrderResponse> PlaceOrder([FromBody] LiqueurOrderRequest request)
    {
        if (string.IsNullOrEmpty(request.VerificationToken))
        {
            return Unauthorized(new { message = "Age verification required to purchase liqueur products." });
        }

        if (request.Items?.Any() != true)
        {
            return BadRequest("Order must contain at least one item.");
        }

        // Get available products
        var products = GetProducts(request.VerificationToken).Value?.ToList() ?? new List<LiqueurProduct>();

        decimal total = 0;
        var orderItems = new List<LiqueurOrderItem>();

        foreach (var item in request.Items)
        {
            var product = products.FirstOrDefault(p => p.Id == item.ProductId);
            if (product == null)
            {
                return BadRequest($"Product with ID {item.ProductId} not found.");
            }

            if (!product.IsAvailable)
            {
                return BadRequest($"{product.Name} is currently not available.");
            }

            var itemTotal = product.Price * item.Quantity;
            total += itemTotal;

            orderItems.Add(new LiqueurOrderItem
            {
                ProductId = item.ProductId,
                ProductName = product.Name,
                Quantity = item.Quantity,
                UnitPrice = product.Price,
                SubTotal = itemTotal,
                AlcoholContent = product.AlcoholContent,
                Volume = product.Volume
            });
        }

        var response = new LiqueurOrderResponse
        {
            OrderId = Guid.NewGuid().ToString(),
            Items = orderItems,
            SubTotal = total,
            ShippingFee = 1500.00m, // Premium shipping for liqueur
            Total = total + 1500.00m,
            CustomerInfo = request.CustomerInfo,
            ShippingAddress = request.ShippingAddress,
            OrderDate = DateTime.UtcNow,
            EstimatedDelivery = DateTime.UtcNow.AddDays(3), // 3-day delivery for liqueur
            Status = "Pending Age Verification",
            PaymentMethod = request.PaymentMethod,
            AgeVerificationRequired = true,
            LegalNotice = "By purchasing this product, you confirm you are 18+ years old and will consume responsibly."
        };

        _logger.LogInformation("Liqueur order placed: {OrderId} for {Total:C} - Age verification required",
            response.OrderId, response.Total);

        return Ok(response);
    }

    /// <summary>
    /// Get responsible drinking information
    /// </summary>
    [HttpGet("responsible-drinking")]
    public ActionResult<ResponsibleDrinkingInfo> GetResponsibleDrinkingInfo()
    {
        var info = new ResponsibleDrinkingInfo
        {
            AgeRequirement = "Must be 18 years or older",
            ConsumptionGuidelines = new List<string>
            {
                "Drink responsibly and in moderation",
                "Do not drink and drive",
                "Avoid alcohol during pregnancy",
                "Be aware of alcohol content (17-20% ABV)",
                "Store away from children"
            },
            HealthWarnings = new List<string>
            {
                "Excessive alcohol consumption is harmful to health",
                "Alcohol may interact with medications",
                "Consult doctor if you have health conditions",
                "Seek help if you have drinking problems"
            },
            SupportResources = new List<string>
            {
                "National Agency for Food and Drug Administration and Control (NAFDAC)",
                "Nigerian Medical Association",
                "Local healthcare providers"
            },
            LegalNotice = "The sale and consumption of alcoholic beverages is regulated by Nigerian law. MrCream promotes responsible drinking."
        };

        return Ok(info);
    }
}

// Data Models for Liqueur API

public class AgeVerificationRequest
{
    public DateTime DateOfBirth { get; set; }
    public string Country { get; set; } = "Nigeria";
}

public class AgeVerificationResponse
{
    public bool IsVerified { get; set; }
    public int Age { get; set; }
    public string? VerificationToken { get; set; }
    public string Message { get; set; } = string.Empty;
    public DateTime? ExpiresAt { get; set; }
}

public class LiqueurProduct
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal AlcoholContent { get; set; }
    public string Volume { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Category { get; set; } = string.Empty;
    public List<string> TastingNotes { get; set; } = new();
    public List<string> ServingSuggestions { get; set; } = new();
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsAvailable { get; set; }
    public bool IsSignature { get; set; }
}

public class CocktailRecipe
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Difficulty { get; set; } = string.Empty;
    public string PrepTime { get; set; } = string.Empty;
    public List<Ingredient> Ingredients { get; set; } = new();
    public List<string> Instructions { get; set; } = new();
    public string ImageUrl { get; set; } = string.Empty;
}

public class Ingredient
{
    public string Name { get; set; } = string.Empty;
    public string Amount { get; set; } = string.Empty;
}

public class ServingGuide
{
    public string OptimalTemperature { get; set; } = string.Empty;
    public string StorageInstructions { get; set; } = string.Empty;
    public List<ServingMethod> ServingMethods { get; set; } = new();
    public List<FoodPairing> FoodPairings { get; set; } = new();
    public List<string> Occasions { get; set; } = new();
}

public class ServingMethod
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Occasion { get; set; } = string.Empty;
}

public class FoodPairing
{
    public string Food { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
}

public class LiqueurOrderRequest
{
    public string VerificationToken { get; set; } = string.Empty;
    public List<LiqueurOrderItemRequest> Items { get; set; } = new();
    public CustomerInfo CustomerInfo { get; set; } = new();
    public DeliveryAddress ShippingAddress { get; set; } = new();
    public string PaymentMethod { get; set; } = "Card";
}

public class LiqueurOrderItemRequest
{
    public int ProductId { get; set; }
    public int Quantity { get; set; }
}

public class LiqueurOrderResponse
{
    public string OrderId { get; set; } = string.Empty;
    public List<LiqueurOrderItem> Items { get; set; } = new();
    public decimal SubTotal { get; set; }
    public decimal ShippingFee { get; set; }
    public decimal Total { get; set; }
    public CustomerInfo CustomerInfo { get; set; } = new();
    public DeliveryAddress ShippingAddress { get; set; } = new();
    public DateTime OrderDate { get; set; }
    public DateTime EstimatedDelivery { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
    public bool AgeVerificationRequired { get; set; }
    public string LegalNotice { get; set; } = string.Empty;
}

public class LiqueurOrderItem
{
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }
    public decimal AlcoholContent { get; set; }
    public string Volume { get; set; } = string.Empty;
}

public class ResponsibleDrinkingInfo
{
    public string AgeRequirement { get; set; } = string.Empty;
    public List<string> ConsumptionGuidelines { get; set; } = new();
    public List<string> HealthWarnings { get; set; } = new();
    public List<string> SupportResources { get; set; } = new();
    public string LegalNotice { get; set; } = string.Empty;
}