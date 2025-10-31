using Microsoft.AspNetCore.Mvc;

namespace MrCream.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QuotesController : ControllerBase
{
    private readonly ILogger<QuotesController> _logger;

    public QuotesController(ILogger<QuotesController> logger)
    {
        _logger = logger;
    }

    /// <summary>
    /// Submit a quote request
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<QuoteResponse>> SubmitQuote([FromBody] QuoteRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _logger.LogInformation("Quote request received from {Email}", request.Email);

        // TODO: Implement actual quote processing logic
        // For now, return a success response
        var response = new QuoteResponse
        {
            Id = Guid.NewGuid().ToString(),
            Message = "Thank you for your quote request. We will contact you soon!",
            SubmittedAt = DateTime.UtcNow,
            Email = request.Email
        };

        return Ok(response);
    }

    /// <summary>
    /// Get quote request status
    /// </summary>
    [HttpGet("{id}")]
    public ActionResult<QuoteStatus> GetQuoteStatus(string id)
    {
        // TODO: Implement actual status retrieval
        return Ok(new QuoteStatus
        {
            Id = id,
            Status = "Pending",
            SubmittedAt = DateTime.UtcNow.AddHours(-1),
            Message = "Your quote request is being processed."
        });
    }
}

public class QuoteRequest
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string ProductCategory { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public int Quantity { get; set; }
}

public class QuoteResponse
{
    public string Id { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime SubmittedAt { get; set; }
    public string Email { get; set; } = string.Empty;
}

public class QuoteStatus
{
    public string Id { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime SubmittedAt { get; set; }
    public string Message { get; set; } = string.Empty;
}
