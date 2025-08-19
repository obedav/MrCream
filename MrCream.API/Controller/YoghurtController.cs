using Microsoft.AspNetCore.Mvc;

namespace MrCream.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class YoghurtController : ControllerBase
{
    private readonly ILogger<YoghurtController> _logger;

    public YoghurtController(ILogger<YoghurtController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Get all available yoghurt flavours
    /// </summary>
    [HttpGet("flavours")]
    public ActionResult<IEnumerable<YoghurtFlavour>> GetFlavours()
    {
        var flavours = new List<YoghurtFlavour>
        {
            new YoghurtFlavour
            {
                Id = 1,
                Name = "MrCream Strawberry",
                Description = "Sweet, creamy, and timeless. Our strawberry yoghurt drink is a classic favorite, with just the right blend of tang and berry-rich flavor.",
                Price = 300.00m,
                Size = "500ml",
                ImageUrl = "/images/yoghurt/strawberry.jpg",
                IsAvailable = true,
                NutritionalInfo = new NutritionalInfo
                {
                    Calories = 180,
                    Protein = "8g",
                    Calcium = "25% DV",
                    Probiotics = "Live cultures"
                }
            },
            new YoghurtFlavour
            {
                Id = 2,
                Name = "MrCream Vanilla",
                Description = "Mellow, smooth, and aromatic. Vanilla lovers will enjoy this elegant twist on creamy indulgence — perfect chilled!",
                Price = 300.00m,
                Size = "500ml",
                ImageUrl = "/images/yoghurt/vanilla.jpg",
                IsAvailable = true,
                NutritionalInfo = new NutritionalInfo
                {
                    Calories = 170,
                    Protein = "8g",
                    Calcium = "25% DV",
                    Probiotics = "Live cultures"
                }
            },
            new YoghurtFlavour
            {
                Id = 3,
                Name = "MrCream Greek Style",
                Description = "Coming Soon - Thick, rich, and protein-packed Greek yoghurt experience.",
                Price = 350.00m,
                Size = "400ml",
                ImageUrl = "/images/yoghurt/greek.jpg",
                IsAvailable = false,
                NutritionalInfo = new NutritionalInfo
                {
                    Calories = 150,
                    Protein = "15g",
                    Calcium = "30% DV",
                    Probiotics = "Live cultures"
                }
            }
        };

        return Ok(flavours);
    }

    /// <summary>
    /// Get specific yoghurt flavour by ID
    /// </summary>
    [HttpGet("flavours/{id}")]
    public ActionResult<YoghurtFlavour> GetFlavour(int id)
    {
        // This would typically come from database
        var flavour = GetFlavours().Value?.FirstOrDefault(f => f.Id == id);

        if (flavour == null)
        {
            return NotFound($"Yoghurt flavour with ID {id} not found.");
        }

        return Ok(flavour);
    }

    /// <summary>
    /// Place an order for yoghurt drinks
    /// </summary>
    [HttpPost("order")]
    public ActionResult<OrderResponse> PlaceOrder([FromBody] YoghurtOrderRequest request)
    {
        if (request == null || !request.Items.Any())
        {
            return BadRequest("Order must contain at least one item.");
        }

        // Calculate total
        var flavours = GetFlavours().Value?.ToList() ?? new List<YoghurtFlavour>();
        decimal total = 0;
        var orderItems = new List<OrderItem>();

        foreach (var item in request.Items)
        {
            var flavour = flavours.FirstOrDefault(f => f.Id == item.FlavourId);
            if (flavour == null)
            {
                return BadRequest($"Flavour with ID {item.FlavourId} not found.");
            }

            if (!flavour.IsAvailable)
            {
                return BadRequest($"{flavour.Name} is currently not available.");
            }

            var itemTotal = flavour.Price * item.Quantity;
            total += itemTotal;

            orderItems.Add(new OrderItem
            {
                FlavourId = item.FlavourId,
                FlavourName = flavour.Name,
                Quantity = item.Quantity,
                UnitPrice = flavour.Price,
                SubTotal = itemTotal
            });
        }

        var response = new OrderResponse
        {
            OrderId = Guid.NewGuid().ToString(),
            Items = orderItems,
            SubTotal = total,
            DeliveryFee = request.DeliveryAddress != null ? 500.00m : 0m,
            Total = total + (request.DeliveryAddress != null ? 500.00m : 0m),
            CustomerInfo = request.CustomerInfo,
            DeliveryAddress = request.DeliveryAddress,
            OrderDate = DateTime.UtcNow,
            EstimatedDelivery = request.DeliveryAddress != null
                ? DateTime.UtcNow.AddHours(2)
                : DateTime.UtcNow.AddMinutes(30),
            Status = "Confirmed",
            PaymentMethod = request.PaymentMethod
        };

        _logger.LogInformation("Yoghurt order placed: {OrderId} for {Total:C}", response.OrderId, response.Total);

        return Ok(response);
    }

    /// <summary>
    /// Get nutritional information for all flavours
    /// </summary>
    [HttpGet("nutrition")]
    public ActionResult<IEnumerable<object>> GetNutritionalInfo()
    {
        var nutritionInfo = GetFlavours().Value?.Select(f => new
        {
            f.Id,
            f.Name,
            Nutrition = f.NutritionalInfo
        });

        return Ok(nutritionInfo);
    }

    /// <summary>
    /// Get store locations where yoghurt is available
    /// </summary>
    [HttpGet("stores")]
    public ActionResult<IEnumerable<StoreLocation>> GetStoreLocations()
    {
        var stores = new List<StoreLocation>
        {
            new StoreLocation
            {
                Id = 1,
                Name = "MrCream Head Office Store",
                Address = "18-26 Dauda Ayorinde Street Adaloko, Afromedia, off Badagry Expressway, Lagos State",
                Phone = "+234 803 235 4952",
                IsOpen = true,
                OpeningHours = "Mon-Fri: 8AM-6PM, Sat-Sun: 9AM-5PM"
            },
            new StoreLocation
            {
                Id = 2,
                Name = "Shoprite - Various Locations",
                Address = "Multiple locations across Lagos",
                Phone = "Contact individual stores",
                IsOpen = true,
                OpeningHours = "Daily: 8AM-10PM"
            }
        };

        return Ok(stores);
    }
}

// Data Models for Yoghurt API
public class YoghurtFlavour
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string Size { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsAvailable { get; set; }
    public NutritionalInfo NutritionalInfo { get; set; } = new();
}

public class NutritionalInfo
{
    public int Calories { get; set; }
    public string Protein { get; set; } = string.Empty;
    public string Calcium { get; set; } = string.Empty;
    public string Probiotics { get; set; } = string.Empty;
}

public class YoghurtOrderRequest
{
    public List<OrderItemRequest> Items { get; set; } = new();
    public CustomerInfo CustomerInfo { get; set; } = new();
    public DeliveryAddress? DeliveryAddress { get; set; }
    public string PaymentMethod { get; set; } = "Cash"; // Cash, Card, Transfer
}

public class OrderItemRequest
{
    public int FlavourId { get; set; }
    public int Quantity { get; set; }
}

public class CustomerInfo
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
}

public class DeliveryAddress
{
    public string Street { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PostalCode { get; set; } = string.Empty;
}

public class OrderResponse
{
    public string OrderId { get; set; } = string.Empty;
    public List<OrderItem> Items { get; set; } = new();
    public decimal SubTotal { get; set; }
    public decimal DeliveryFee { get; set; }
    public decimal Total { get; set; }
    public CustomerInfo CustomerInfo { get; set; } = new();
    public DeliveryAddress? DeliveryAddress { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime EstimatedDelivery { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
}

public class OrderItem
{
    public int FlavourId { get; set; }
    public string FlavourName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }
}

public class StoreLocation
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public bool IsOpen { get; set; }
    public string OpeningHours { get; set; } = string.Empty;
}