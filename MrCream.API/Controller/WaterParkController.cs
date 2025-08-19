using Microsoft.AspNetCore.Mvc;

namespace MrCream.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WaterParkController : ControllerBase
{
    private readonly ILogger<WaterParkController> _logger;

    public WaterParkController(ILogger<WaterParkController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Get all water park attractions and facilities
    /// </summary>
    [HttpGet("attractions")]
    public ActionResult<IEnumerable<Attraction>> GetAttractions()
    {
        var attractions = new List<Attraction>
        {
            new Attraction
            {
                Id = 1,
                Name = "Adult Swimming Pool",
                Description = "Feel the rhythm of the ocean with powerful, timed waves that rise and fall — just like the tide! Perfect for those who want beach vibes without leaving the city.",
                Category = "Swimming",
                AgeRestriction = "13+",
                Capacity = 150,
                IsOperational = true,
                ImageUrl = "/images/waterpark/adult-pool.jpg"
            },
            new Attraction
            {
                Id = 2,
                Name = "VIP Adult Swimming Pool",
                Description = "Private pool perfect for pool parties with limited people access, for just you and yours.",
                Category = "VIP Swimming",
                AgeRestriction = "18+",
                Capacity = 25,
                IsOperational = true,
                ImageUrl = "/images/waterpark/vip-pool.jpg"
            },
            new Attraction
            {
                Id = 3,
                Name = "Merry-go-round",
                Description = "Fast, winding, and full of adrenaline, our Turbo Twist Slides are for thrill-seekers who love speed, spirals, and splashes.",
                Category = "Rides",
                AgeRestriction = "8+",
                Capacity = 12,
                IsOperational = true,
                ImageUrl = "/images/waterpark/merry-go-round.jpg"
            },
            new Attraction
            {
                Id = 4,
                Name = "Swimming Splash Zone (Kids Area)",
                Description = "A colorful and fully supervised water playground designed for toddlers and young children. Think mini slides, sprinklers, tipping buckets, and loads of fun!",
                Category = "Kids Zone",
                AgeRestriction = "3-12 years",
                Capacity = 50,
                IsOperational = true,
                ImageUrl = "/images/waterpark/kids-zone.jpg"
            }
        };

        return Ok(attractions);
    }

    /// <summary>
    /// Get available ticket types and pricing
    /// </summary>
    [HttpGet("tickets")]
    public ActionResult<IEnumerable<TicketType>> GetTicketTypes()
    {
        var tickets = new List<TicketType>
        {
            new TicketType
            {
                Id = 1,
                Name = "Daily Entry Pass - Child",
                Description = "Full day access to all age-appropriate attractions for children (3-12 years)",
                Price = 2500.00m,
                ValidFor = "1 Day",
                AgeGroup = "Children (3-12)",
                Includes = new List<string> { "All attractions access", "Life jacket rental", "Locker access" }
            },
            new TicketType
            {
                Id = 2,
                Name = "Daily Entry Pass - Adult",
                Description = "Full day access to all attractions for adults",
                Price = 4000.00m,
                ValidFor = "1 Day",
                AgeGroup = "Adults (13+)",
                Includes = new List<string> { "All attractions access", "Locker access", "Free parking" }
            },
            new TicketType
            {
                Id = 3,
                Name = "VIP Pass",
                Description = "Express access to slides, VIP cabanas, free drinks, and premium service all day",
                Price = 8000.00m,
                ValidFor = "1 Day",
                AgeGroup = "All ages",
                Includes = new List<string> { "Express access", "VIP cabana", "Free drinks", "Premium service", "Dedicated host" }
            },
            new TicketType
            {
                Id = 4,
                Name = "Family Package (2 Adults + 2 Children)",
                Description = "Great value package for families",
                Price = 12000.00m,
                ValidFor = "1 Day",
                AgeGroup = "Family",
                Includes = new List<string> { "All attractions", "Group discount", "Free snacks", "Priority parking" }
            },
            new TicketType
            {
                Id = 5,
                Name = "Annual Membership",
                Description = "Unlimited access year-round, discounts on food & drinks, priority booking",
                Price = 50000.00m,
                ValidFor = "1 Year",
                AgeGroup = "All ages",
                Includes = new List<string> { "Unlimited visits", "Food discounts", "Priority booking", "Member events", "Guest passes" }
            }
        };

        return Ok(tickets);
    }

    /// <summary>
    /// Book water park tickets
    /// </summary>
    [HttpPost("book")]
    public ActionResult<BookingResponse> BookTickets([FromBody] BookingRequest request)
    {
        if (request == null || !request.Tickets.Any())
        {
            return BadRequest("Booking must contain at least one ticket.");
        }

        // Validate visit date
        if (request.VisitDate.Date < DateTime.Today)
        {
            return BadRequest("Visit date cannot be in the past.");
        }

        // Get available tickets
        var availableTickets = GetTicketTypes().Value?.ToList() ?? new List<TicketType>();

        decimal total = 0;
        var bookedTickets = new List<BookedTicket>();

        foreach (var ticketRequest in request.Tickets)
        {
            var ticketType = availableTickets.FirstOrDefault(t => t.Id == ticketRequest.TicketTypeId);
            if (ticketType == null)
            {
                return BadRequest($"Ticket type with ID {ticketRequest.TicketTypeId} not found.");
            }

            var ticketTotal = ticketType.Price * ticketRequest.Quantity;
            total += ticketTotal;

            bookedTickets.Add(new BookedTicket
            {
                TicketTypeId = ticketRequest.TicketTypeId,
                TicketTypeName = ticketType.Name,
                Quantity = ticketRequest.Quantity,
                UnitPrice = ticketType.Price,
                SubTotal = ticketTotal,
                ValidFor = ticketType.ValidFor
            });
        }

        var booking = new BookingResponse
        {
            BookingId = Guid.NewGuid().ToString(),
            BookingReference = GenerateBookingReference(),
            Tickets = bookedTickets,
            VisitDate = request.VisitDate,
            CustomerInfo = request.CustomerInfo,
            SubTotal = total,
            ServiceFee = total * 0.05m, // 5% service fee
            Total = total + (total * 0.05m),
            BookingDate = DateTime.UtcNow,
            Status = "Confirmed",
            PaymentMethod = request.PaymentMethod,
            SpecialRequests = request.SpecialRequests
        };

        _logger.LogInformation("Water park booking created: {BookingId} for {VisitDate} - Total: {Total:C}",
            booking.BookingId, booking.VisitDate.ToShortDateString(), booking.Total);

        return Ok(booking);
    }

    /// <summary>
    /// Get water park operating hours and information
    /// </summary>
    [HttpGet("info")]
    public ActionResult<WaterParkInfo> GetParkInfo()
    {
        var info = new WaterParkInfo
        {
            Name = "MrCream Water Park",
            Tagline = "Where Every Drop is a Splash of Joy!",
            Location = new ParkLocation
            {
                Address = "18-26 Dauda Ayorinde Street Adaloko, Afromedia, off Badagry Expressway, Lagos State",
                AlternateAddress = "Check Point Bus Stop, LASU Igando Road, Ijegun, Lagos",
                Coordinates = new Coordinates { Latitude = 6.5244, Longitude = 3.3792 }
            },
            OperatingHours = new OperatingHours
            {
                WeekdayHours = "Mon–Fri: 10am – 6pm",
                WeekendHours = "Sat–Sun & Public Holidays: 9am – 7pm"
            },
            Facilities = new List<string>
            {
                "Free & secure parking",
                "Changing rooms & shower facilities",
                "Secure lockers",
                "First aid stations",
                "Certified lifeguards",
                "Food court with MrCream yoghurt drinks",
                "Shaded picnic areas",
                "Gift shop"
            },
            SafetyFeatures = new List<string>
            {
                "Certified lifeguards at every attraction",
                "Constant water quality monitoring",
                "First aid stations with trained medical personnel",
                "Life jackets and flotation devices available",
                "Clear height/age restrictions for all rides",
                "Emergency response protocols"
            },
            ContactInfo = new ContactInfo
            {
                Phone = "+234 XXX XXX XXXX",
                Email = "events@mrcreamwaterpark.com",
                Website = "https://mrcream.com/waterpark",
                SocialMedia = new SocialMedia
                {
                    Instagram = "@MrCreamWaterPark",
                    Facebook = "/MrCreamWaterPark",
                    TikTok = "@SplashWithMrCream"
                }
            }
        };

        return Ok(info);
    }

    /// <summary>
    /// Get available event packages for parties and groups
    /// </summary>
    [HttpGet("events")]
    public ActionResult<IEnumerable<EventPackage>> GetEventPackages()
    {
        var packages = new List<EventPackage>
        {
            new EventPackage
            {
                Id = 1,
                Name = "Birthday Party Package",
                Description = "Perfect for celebrating special birthdays with friends and family",
                Price = 15000.00m,
                MinGuests = 10,
                MaxGuests = 25,
                Duration = "4 hours",
                Includes = new List<string>
                {
                    "Dedicated party area",
                    "Birthday decorations",
                    "MrCream yoghurt drinks for all guests",
                    "Party host",
                    "Life jacket rentals",
                    "Group photo session"
                }
            },
            new EventPackage
            {
                Id = 2,
                Name = "School Excursion Package",
                Description = "Educational and fun day out for school groups",
                Price = 200000.00m,
                MinGuests = 50,
                MaxGuests = 200,
                Duration = "Full day",
                Includes = new List<string>
                {
                    "Educational tour",
                    "Safety briefing",
                    "Lunch package",
                    "Transportation coordination",
                    "Teacher/chaperone free passes",
                    "First aid support"
                }
            },
            new EventPackage
            {
                Id = 3,
                Name = "Corporate Team Building",
                Description = "Build stronger teams through fun water activities",
                Price = 300000.00m,
                MinGuests = 20,
                MaxGuests = 100,
                Duration = "Half or full day",
                Includes = new List<string>
                {
                    "Team building activities",
                    "Professional facilitator",
                    "Catering options",
                    "Private meeting space",
                    "Photography service",
                    "Certificate of participation"
                }
            }
        };

        return Ok(packages);
    }

    /// <summary>
    /// Check real-time park capacity
    /// </summary>
    [HttpGet("capacity")]
    public ActionResult<ParkCapacity> GetParkCapacity()
    {
        // In a real application, this would connect to actual capacity monitoring systems
        var capacity = new ParkCapacity
        {
            TotalCapacity = 500,
            CurrentVisitors = new Random().Next(50, 450), // Simulated real-time data
            AvailableSpots = 0,
            Status = "Open",
            LastUpdated = DateTime.UtcNow,
            AttractionStatus = new List<AttractionStatus>
            {
                new AttractionStatus { Name = "Adult Pool", IsOpen = true, WaitTime = "No wait" },
                new AttractionStatus { Name = "VIP Pool", IsOpen = true, WaitTime = "Available" },
                new AttractionStatus { Name = "Merry-go-round", IsOpen = true, WaitTime = "5 mins" },
                new AttractionStatus { Name = "Kids Zone", IsOpen = true, WaitTime = "No wait" }
            }
        };

        capacity.AvailableSpots = capacity.TotalCapacity - capacity.CurrentVisitors;

        if (capacity.CurrentVisitors >= capacity.TotalCapacity * 0.9)
            capacity.Status = "Nearly Full";

        return Ok(capacity);
    }

    private string GenerateBookingReference()
    {
        return $"MC{DateTime.Now:yyyyMMdd}{new Random().Next(1000, 9999)}";
    }
}

// Data Models for Water Park API

public class Attraction
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string AgeRestriction { get; set; } = string.Empty;
    public int Capacity { get; set; }
    public bool IsOperational { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}

public class TicketType
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string ValidFor { get; set; } = string.Empty;
    public string AgeGroup { get; set; } = string.Empty;
    public List<string> Includes { get; set; } = new();
}

public class BookingRequest
{
    public List<TicketRequest> Tickets { get; set; } = new();
    public DateTime VisitDate { get; set; }
    public CustomerInfo CustomerInfo { get; set; } = new();
    public string PaymentMethod { get; set; } = "Cash";
    public string SpecialRequests { get; set; } = string.Empty;
}

public class TicketRequest
{
    public int TicketTypeId { get; set; }
    public int Quantity { get; set; }
}

public class BookingResponse
{
    public string BookingId { get; set; } = string.Empty;
    public string BookingReference { get; set; } = string.Empty;
    public List<BookedTicket> Tickets { get; set; } = new();
    public DateTime VisitDate { get; set; }
    public CustomerInfo CustomerInfo { get; set; } = new();
    public decimal SubTotal { get; set; }
    public decimal ServiceFee { get; set; }
    public decimal Total { get; set; }
    public DateTime BookingDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;
    public string SpecialRequests { get; set; } = string.Empty;
}

public class BookedTicket
{
    public int TicketTypeId { get; set; }
    public string TicketTypeName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal SubTotal { get; set; }
    public string ValidFor { get; set; } = string.Empty;
}

public class WaterParkInfo
{
    public string Name { get; set; } = string.Empty;
    public string Tagline { get; set; } = string.Empty;
    public ParkLocation Location { get; set; } = new();
    public OperatingHours OperatingHours { get; set; } = new();
    public List<string> Facilities { get; set; } = new();
    public List<string> SafetyFeatures { get; set; } = new();
    public ContactInfo ContactInfo { get; set; } = new();
}

public class ParkLocation
{
    public string Address { get; set; } = string.Empty;
    public string AlternateAddress { get; set; } = string.Empty;
    public Coordinates Coordinates { get; set; } = new();
}

public class Coordinates
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

public class OperatingHours
{
    public string WeekdayHours { get; set; } = string.Empty;
    public string WeekendHours { get; set; } = string.Empty;
}

public class ContactInfo
{
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public SocialMedia SocialMedia { get; set; } = new();
}

public class SocialMedia
{
    public string Instagram { get; set; } = string.Empty;
    public string Facebook { get; set; } = string.Empty;
    public string TikTok { get; set; } = string.Empty;
}

public class EventPackage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int MinGuests { get; set; }
    public int MaxGuests { get; set; }
    public string Duration { get; set; } = string.Empty;
    public List<string> Includes { get; set; } = new();
}

public class ParkCapacity
{
    public int TotalCapacity { get; set; }
    public int CurrentVisitors { get; set; }
    public int AvailableSpots { get; set; }
    public string Status { get; set; } = string.Empty;
    public DateTime LastUpdated { get; set; }
    public List<AttractionStatus> AttractionStatus { get; set; } = new();
}

public class AttractionStatus
{
    public string Name { get; set; } = string.Empty;
    public bool IsOpen { get; set; }
    public string WaitTime { get; set; } = string.Empty;
}