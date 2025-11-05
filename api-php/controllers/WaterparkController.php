<?php
/**
 * Water Park Controller
 * Handles all water park related endpoints
 */

class WaterparkController {

    /**
     * GET /api/waterpark/attractions
     * Get all water park attractions
     */
    public function getAttractions() {
        $attractions = [
            [
                'Id' => 1,
                'Name' => 'Adult Swimming Pool',
                'Description' => 'Feel the rhythm of the ocean with powerful, timed waves that rise and fall — just like the tide! Perfect for those who want beach vibes without leaving the city.',
                'Category' => 'Swimming',
                'AgeRestriction' => '13+',
                'Capacity' => 150,
                'IsOperational' => true,
                'ImageUrl' => '/images/waterpark/adult-pool.jpg'
            ],
            [
                'Id' => 2,
                'Name' => 'VIP Adult Swimming Pool',
                'Description' => 'Private pool perfect for pool parties with limited people access, for just you and yours.',
                'Category' => 'VIP Swimming',
                'AgeRestriction' => '18+',
                'Capacity' => 25,
                'IsOperational' => true,
                'ImageUrl' => '/images/waterpark/vip-pool.jpg'
            ],
            [
                'Id' => 3,
                'Name' => 'Merry-go-round',
                'Description' => 'Fast, winding, and full of adrenaline, our Turbo Twist Slides are for thrill-seekers who love speed, spirals, and splashes.',
                'Category' => 'Rides',
                'AgeRestriction' => '8+',
                'Capacity' => 12,
                'IsOperational' => true,
                'ImageUrl' => '/images/waterpark/merry-go-round.jpg'
            ],
            [
                'Id' => 4,
                'Name' => 'Swimming Splash Zone (Kids Area)',
                'Description' => 'A colorful and fully supervised water playground designed for toddlers and young children. Think mini slides, sprinklers, tipping buckets, and loads of fun!',
                'Category' => 'Kids Zone',
                'AgeRestriction' => '3-12 years',
                'Capacity' => 50,
                'IsOperational' => true,
                'ImageUrl' => '/images/waterpark/kids-zone.jpg'
            ]
        ];

        sendJson($attractions);
    }

    /**
     * GET /api/waterpark/tickets
     * Get available ticket types and pricing
     */
    public function getTickets() {
        $tickets = [
            [
                'Id' => 1,
                'Name' => 'Daily Entry Pass - Child',
                'Description' => 'Full day access to all age-appropriate attractions for children (3-12 years)',
                'Price' => 2500.00,
                'ValidFor' => '1 Day',
                'AgeGroup' => 'Children (3-12)',
                'Includes' => ['All attractions access', 'Life jacket rental', 'Locker access']
            ],
            [
                'Id' => 2,
                'Name' => 'Daily Entry Pass - Adult',
                'Description' => 'Full day access to all attractions for adults',
                'Price' => 4000.00,
                'ValidFor' => '1 Day',
                'AgeGroup' => 'Adults (13+)',
                'Includes' => ['All attractions access', 'Locker access', 'Free parking']
            ],
            [
                'Id' => 3,
                'Name' => 'VIP Pass',
                'Description' => 'Express access to slides, VIP cabanas, free drinks, and premium service all day',
                'Price' => 8000.00,
                'ValidFor' => '1 Day',
                'AgeGroup' => 'All ages',
                'Includes' => ['Express access', 'VIP cabana', 'Free drinks', 'Premium service', 'Dedicated host']
            ],
            [
                'Id' => 4,
                'Name' => 'Family Package (2 Adults + 2 Children)',
                'Description' => 'Great value package for families',
                'Price' => 12000.00,
                'ValidFor' => '1 Day',
                'AgeGroup' => 'Family',
                'Includes' => ['All attractions', 'Group discount', 'Free snacks', 'Priority parking']
            ],
            [
                'Id' => 5,
                'Name' => 'Annual Membership',
                'Description' => 'Unlimited access year-round, discounts on food & drinks, priority booking',
                'Price' => 50000.00,
                'ValidFor' => '1 Year',
                'AgeGroup' => 'All ages',
                'Includes' => ['Unlimited visits', 'Food discounts', 'Priority booking', 'Member events', 'Guest passes']
            ]
        ];

        sendJson($tickets);
    }

    /**
     * GET /api/waterpark/info
     * Get water park information and operating hours
     */
    public function getInfo() {
        $info = [
            'Name' => 'MrCream Water Park',
            'Tagline' => 'Where Every Drop is a Splash of Joy!',
            'Location' => [
                'Address' => '18-26 Dauda Ayorinde Street Adaloko, Afromedia, off Badagry Expressway, Lagos State',
                'AlternateAddress' => 'Check Point Bus Stop, LASU Igando Road, Ijegun, Lagos',
                'Coordinates' => [
                    'Latitude' => 6.5244,
                    'Longitude' => 3.3792
                ]
            ],
            'OperatingHours' => [
                'WeekdayHours' => 'Mon–Fri: 10am – 6pm',
                'WeekendHours' => 'Sat–Sun & Public Holidays: 9am – 7pm'
            ],
            'Facilities' => [
                'Free & secure parking',
                'Changing rooms & shower facilities',
                'Secure lockers',
                'First aid stations',
                'Certified lifeguards',
                'Food court with MrCream yoghurt drinks',
                'Shaded picnic areas',
                'Gift shop'
            ],
            'SafetyFeatures' => [
                'Certified lifeguards at every attraction',
                'Constant water quality monitoring',
                'First aid stations with trained medical personnel',
                'Life jackets and flotation devices available',
                'Clear height/age restrictions for all rides',
                'Emergency response protocols'
            ],
            'ContactInfo' => [
                'Phone' => '+234 XXX XXX XXXX',
                'Email' => 'events@mrcreamwaterpark.com',
                'Website' => 'https://mrcream.com/waterpark',
                'SocialMedia' => [
                    'Instagram' => '@MrCreamWaterPark',
                    'Facebook' => '/MrCreamWaterPark',
                    'TikTok' => '@SplashWithMrCream'
                ]
            ]
        ];

        sendJson($info);
    }

    /**
     * GET /api/waterpark/events
     * Get available event packages
     */
    public function getEvents() {
        $packages = [
            [
                'Id' => 1,
                'Name' => 'Birthday Party Package',
                'Description' => 'Perfect for celebrating special birthdays with friends and family',
                'Price' => 15000.00,
                'MinGuests' => 10,
                'MaxGuests' => 25,
                'Duration' => '4 hours',
                'Includes' => [
                    'Dedicated party area',
                    'Birthday decorations',
                    'MrCream yoghurt drinks for all guests',
                    'Party host',
                    'Life jacket rentals',
                    'Group photo session'
                ]
            ],
            [
                'Id' => 2,
                'Name' => 'School Excursion Package',
                'Description' => 'Educational and fun day out for school groups',
                'Price' => 200000.00,
                'MinGuests' => 50,
                'MaxGuests' => 200,
                'Duration' => 'Full day',
                'Includes' => [
                    'Educational tour',
                    'Safety briefing',
                    'Lunch package',
                    'Transportation coordination',
                    'Teacher/chaperone free passes',
                    'First aid support'
                ]
            ],
            [
                'Id' => 3,
                'Name' => 'Corporate Team Building',
                'Description' => 'Build stronger teams through fun water activities',
                'Price' => 300000.00,
                'MinGuests' => 20,
                'MaxGuests' => 100,
                'Duration' => 'Half or full day',
                'Includes' => [
                    'Team building activities',
                    'Professional facilitator',
                    'Catering options',
                    'Private meeting space',
                    'Photography service',
                    'Certificate of participation'
                ]
            ]
        ];

        sendJson($packages);
    }

    /**
     * GET /api/waterpark/capacity
     * Get real-time park capacity
     */
    public function getCapacity() {
        $totalCapacity = 500;
        $currentVisitors = rand(50, 450);
        $availableSpots = $totalCapacity - $currentVisitors;
        $status = 'Open';

        if ($currentVisitors >= $totalCapacity * 0.9) {
            $status = 'Nearly Full';
        }

        $capacity = [
            'TotalCapacity' => $totalCapacity,
            'CurrentVisitors' => $currentVisitors,
            'AvailableSpots' => $availableSpots,
            'Status' => $status,
            'LastUpdated' => date('c'),
            'AttractionStatus' => [
                ['Name' => 'Adult Pool', 'IsOpen' => true, 'WaitTime' => 'No wait'],
                ['Name' => 'VIP Pool', 'IsOpen' => true, 'WaitTime' => 'Available'],
                ['Name' => 'Merry-go-round', 'IsOpen' => true, 'WaitTime' => '5 mins'],
                ['Name' => 'Kids Zone', 'IsOpen' => true, 'WaitTime' => 'No wait']
            ]
        ];

        sendJson($capacity);
    }

    /**
     * POST /api/waterpark/book
     * Book water park tickets
     */
    public function postBook() {
        $request = getJsonInput();

        if (!isset($request['Tickets']) || empty($request['Tickets'])) {
            sendError('Booking must contain at least one ticket.', 400);
        }

        if (!isset($request['VisitDate'])) {
            sendError('Visit date is required.', 400);
        }

        $visitDate = strtotime($request['VisitDate']);
        if ($visitDate < strtotime('today')) {
            sendError('Visit date cannot be in the past.', 400);
        }

        // Get available tickets
        $availableTickets = [
            1 => ['Id' => 1, 'Name' => 'Daily Entry Pass - Child', 'Price' => 2500.00, 'ValidFor' => '1 Day'],
            2 => ['Id' => 2, 'Name' => 'Daily Entry Pass - Adult', 'Price' => 4000.00, 'ValidFor' => '1 Day'],
            3 => ['Id' => 3, 'Name' => 'VIP Pass', 'Price' => 8000.00, 'ValidFor' => '1 Day'],
            4 => ['Id' => 4, 'Name' => 'Family Package (2 Adults + 2 Children)', 'Price' => 12000.00, 'ValidFor' => '1 Day'],
            5 => ['Id' => 5, 'Name' => 'Annual Membership', 'Price' => 50000.00, 'ValidFor' => '1 Year']
        ];

        $bookedTickets = [];
        $total = 0;

        foreach ($request['Tickets'] as $ticketRequest) {
            $ticketTypeId = $ticketRequest['TicketTypeId'];

            if (!isset($availableTickets[$ticketTypeId])) {
                sendError("Ticket type with ID $ticketTypeId not found.", 400);
            }

            $ticketType = $availableTickets[$ticketTypeId];
            $quantity = $ticketRequest['Quantity'];
            $subTotal = $ticketType['Price'] * $quantity;
            $total += $subTotal;

            $bookedTickets[] = [
                'TicketTypeId' => $ticketTypeId,
                'TicketTypeName' => $ticketType['Name'],
                'Quantity' => $quantity,
                'UnitPrice' => $ticketType['Price'],
                'SubTotal' => $subTotal,
                'ValidFor' => $ticketType['ValidFor']
            ];
        }

        $serviceFee = $total * 0.05;

        $booking = [
            'BookingId' => uniqid('booking_'),
            'BookingReference' => 'MC' . date('Ymd') . rand(1000, 9999),
            'Tickets' => $bookedTickets,
            'VisitDate' => $request['VisitDate'],
            'CustomerInfo' => $request['CustomerInfo'] ?? [],
            'SubTotal' => $total,
            'ServiceFee' => $serviceFee,
            'Total' => $total + $serviceFee,
            'BookingDate' => date('c'),
            'Status' => 'Confirmed',
            'PaymentMethod' => $request['PaymentMethod'] ?? 'Cash',
            'SpecialRequests' => $request['SpecialRequests'] ?? ''
        ];

        logMessage("Water park booking created: {$booking['BookingId']} for {$booking['VisitDate']} - Total: ₦{$booking['Total']}");

        sendJson($booking);
    }
}
