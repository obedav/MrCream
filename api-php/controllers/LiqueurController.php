<?php
/**
 * Liqueur Controller
 * Handles all Turbo Cream Liqueur products (18+ age gated)
 */

class LiqueurController {

    /**
     * Get verification token from Authorization header or fallback to GET params
     * @return string|null The verification token
     */
    private function getVerificationToken() {
        // Check Authorization header first (preferred method)
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            // Extract Bearer token
            if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
                return $matches[1];
            }
        }

        // Fallback to GET parameters for backward compatibility
        return $_GET['verificationToken'] ?? $_GET['token'] ?? null;
    }

    /**
     * POST /api/liqueur/verify-age
     * Verify user age (18+ required)
     */
    public function postVerifyAge() {
        $request = getJsonInput();

        if (!isset($request['DateOfBirth'])) {
            sendError('Date of birth is required.', 400);
        }

        $dob = strtotime($request['DateOfBirth']);
        $today = strtotime('today');

        $age = date('Y', $today) - date('Y', $dob);

        // Adjust age if birthday hasn't occurred this year yet
        if (strtotime(date('Y-m-d', $dob)) > strtotime(date('Y') . '-' . date('m-d', $dob))) {
            $age--;
        }

        $isVerified = $age >= 18;
        $token = $isVerified ? bin2hex(random_bytes(16)) : null;

        $response = [
            'IsVerified' => $isVerified,
            'Age' => $age,
            'VerificationToken' => $token,
            'Message' => $isVerified
                ? 'Age verified successfully. Welcome to Turbo Cream Liqueur!'
                : 'You must be 18 or older to access liqueur products.',
            'ExpiresAt' => $isVerified ? date('c', strtotime('+24 hours')) : null
        ];

        if ($isVerified) {
            logMessage("Age verification successful for user aged $age");
        } else {
            logMessage("Age verification failed for user aged $age", 'WARNING');
        }

        sendJson($response);
    }

    /**
     * GET /api/liqueur/products
     * Get all Turbo Cream Liqueur products (requires age verification)
     */
    public function getProducts() {
        $verificationToken = $this->getVerificationToken();

        if (empty($verificationToken)) {
            sendError('Age verification required. Please verify your age first.', 401);
        }

        $products = [
            [
                'id' => 1,
                'Id' => 1, // Keep for backward compatibility
                'name' => 'Turbo Cream Liqueur Original',
                'Name' => 'Turbo Cream Liqueur Original',
                'description' => 'The heart of our brand – a silky-smooth cream liqueur made with premium fresh dairy cream and a refined spirit base, blended with unique African ingredients like roasted cocoa, caramel spice, and a hint of West African vanilla bean.',
                'Description' => 'The heart of our brand – a silky-smooth cream liqueur made with premium fresh dairy cream and a refined spirit base, blended with unique African ingredients like roasted cocoa, caramel spice, and a hint of West African vanilla bean.',
                'alcoholContent' => 18.0,
                'AlcoholContent' => 18.0,
                'volume' => '250ml',
                'Volume' => '250ml',
                'price' => 8500.00,
                'Price' => 8500.00,
                'category' => 'Original',
                'Category' => 'Original',
                'tastingNotes' => ['Silky cream', 'Roasted cocoa', 'Caramel spice', 'West African vanilla'],
                'TastingNotes' => ['Silky cream', 'Roasted cocoa', 'Caramel spice', 'West African vanilla'],
                'servingSuggestions' => ['Neat', 'On the rocks', 'In cocktails', 'With desserts'],
                'ServingSuggestions' => ['Neat', 'On the rocks', 'In cocktails', 'With desserts'],
                'image' => 'images/liqueur/TurboCream-01.png',
                'ImageUrl' => '/images/liqueur/turbo-original.jpg',
                'isAvailable' => true,
                'IsAvailable' => true,
                'isSignature' => true,
                'IsSignature' => true
            ],
            [
                'id' => 2,
                'Id' => 2,
                'name' => 'Turbo Cream Gold Reserve',
                'Name' => 'Turbo Cream Gold Reserve',
                'description' => 'Premium aged cream liqueur infused with authentic African botanicals including baobab fruit, kola nut, and West African ginger. A celebration of African heritage in every sip.',
                'Description' => 'Premium aged cream liqueur infused with authentic African botanicals including baobab fruit, kola nut, and West African ginger. A celebration of African heritage in every sip.',
                'alcoholContent' => 20.0,
                'AlcoholContent' => 20.0,
                'volume' => '250ml',
                'Volume' => '250ml',
                'price' => 12000.00,
                'Price' => 12000.00,
                'category' => 'Premium',
                'Category' => 'Premium',
                'tastingNotes' => ['Baobab fruit', 'Kola nut', 'West African ginger', 'Premium aged spirits'],
                'TastingNotes' => ['Baobab fruit', 'Kola nut', 'West African ginger', 'Premium aged spirits'],
                'servingSuggestions' => ['Neat', 'Premium cocktails', 'Special occasions'],
                'ServingSuggestions' => ['Neat', 'Premium cocktails', 'Special occasions'],
                'image' => 'images/liqueur/MrReam-GIn.png',
                'ImageUrl' => '/images/liqueur/turbo-gold.jpg',
                'isAvailable' => true,
                'IsAvailable' => true,
                'isSignature' => false,
                'IsSignature' => false
            ],
            [
                'id' => 3,
                'Id' => 3,
                'name' => 'Turbo Cream Coffee Fusion',
                'Name' => 'Turbo Cream Coffee Fusion',
                'description' => 'Rich cream liqueur blended with premium Nigerian coffee beans and hints of dark chocolate. Perfect for coffee lovers who appreciate African excellence.',
                'Description' => 'Rich cream liqueur blended with premium Nigerian coffee beans and hints of dark chocolate. Perfect for coffee lovers who appreciate African excellence.',
                'alcoholContent' => 17.0,
                'AlcoholContent' => 17.0,
                'volume' => '250ml',
                'Volume' => '250ml',
                'price' => 9500.00,
                'Price' => 9500.00,
                'category' => 'Specialty',
                'Category' => 'Specialty',
                'tastingNotes' => ['Nigerian coffee', 'Dark chocolate', 'Cream', 'Subtle spice'],
                'TastingNotes' => ['Nigerian coffee', 'Dark chocolate', 'Cream', 'Subtle spice'],
                'servingSuggestions' => ['In coffee', 'Espresso martini', 'After dinner drink'],
                'ServingSuggestions' => ['In coffee', 'Espresso martini', 'After dinner drink'],
                'image' => 'images/liqueur/TurboCream-01.png',
                'ImageUrl' => '/images/liqueur/turbo-coffee.jpg',
                'isAvailable' => false,
                'IsAvailable' => false,
                'isSignature' => false,
                'IsSignature' => false
            ]
        ];

        sendJson($products);
    }

    /**
     * GET /api/liqueur/cocktails
     * Get cocktail recipes featuring Turbo Cream Liqueur
     */
    public function getCocktails() {
        $verificationToken = $this->getVerificationToken();

        if (empty($verificationToken)) {
            sendError('Age verification required.', 401);
        }

        $cocktails = [
            [
                'id' => 1,
                'Id' => 1,
                'name' => 'Turbo Espresso Martini',
                'Name' => 'Turbo Espresso Martini',
                'description' => 'The signature Turbo cocktail - bold, creamy, and energizing',
                'Description' => 'The signature Turbo cocktail - bold, creamy, and energizing',
                'difficulty' => 'Easy',
                'Difficulty' => 'Easy',
                'prepTime' => '5 minutes',
                'PrepTime' => '5 minutes',
                'ingredients' => [
                    'Turbo Cream Liqueur Original (60ml)',
                    'Fresh espresso (30ml)',
                    'Premium vodka (30ml)',
                    'Simple syrup (15ml)',
                    'Coffee beans (3 beans for garnish)'
                ],
                'Ingredients' => [
                    ['Name' => 'Turbo Cream Liqueur Original', 'Amount' => '60ml'],
                    ['Name' => 'Fresh espresso', 'Amount' => '30ml'],
                    ['Name' => 'Premium vodka', 'Amount' => '30ml'],
                    ['Name' => 'Simple syrup', 'Amount' => '15ml'],
                    ['Name' => 'Coffee beans', 'Amount' => '3 beans (garnish)']
                ],
                'instructions' => [
                    'Add ice to cocktail shaker',
                    'Pour Turbo Cream Liqueur, espresso, vodka, and simple syrup',
                    'Shake vigorously for 15 seconds',
                    'Double strain into chilled martini glass',
                    'Garnish with 3 coffee beans',
                    'Serve immediately'
                ],
                'Instructions' => [
                    'Add ice to cocktail shaker',
                    'Pour Turbo Cream Liqueur, espresso, vodka, and simple syrup',
                    'Shake vigorously for 15 seconds',
                    'Double strain into chilled martini glass',
                    'Garnish with 3 coffee beans',
                    'Serve immediately'
                ],
                'image' => '/images/cocktails/turbo-espresso-martini.jpg',
                'ImageUrl' => '/images/cocktails/turbo-espresso-martini.jpg'
            ],
            [
                'id' => 2,
                'Id' => 2,
                'name' => 'African Sunset',
                'Name' => 'African Sunset',
                'description' => 'A tropical twist celebrating African flavors',
                'Description' => 'A tropical twist celebrating African flavors',
                'difficulty' => 'Medium',
                'Difficulty' => 'Medium',
                'prepTime' => '8 minutes',
                'PrepTime' => '8 minutes',
                'ingredients' => [
                    'Turbo Cream Liqueur Gold (45ml)',
                    'Coconut rum (30ml)',
                    'Pineapple juice (60ml)',
                    'Lime juice (15ml)',
                    'Toasted coconut flakes (for rim)'
                ],
                'Ingredients' => [
                    ['Name' => 'Turbo Cream Liqueur Gold', 'Amount' => '45ml'],
                    ['Name' => 'Coconut rum', 'Amount' => '30ml'],
                    ['Name' => 'Pineapple juice', 'Amount' => '60ml'],
                    ['Name' => 'Lime juice', 'Amount' => '15ml'],
                    ['Name' => 'Toasted coconut flakes', 'Amount' => 'For rim']
                ],
                'instructions' => [
                    'Rim glass with toasted coconut flakes',
                    'Add ice to shaker',
                    'Combine all liquid ingredients',
                    'Shake well and strain over fresh ice',
                    'Garnish with pineapple wedge and lime wheel'
                ],
                'Instructions' => [
                    'Rim glass with toasted coconut flakes',
                    'Add ice to shaker',
                    'Combine all liquid ingredients',
                    'Shake well and strain over fresh ice',
                    'Garnish with pineapple wedge and lime wheel'
                ],
                'image' => '/images/cocktails/african-sunset.jpg',
                'ImageUrl' => '/images/cocktails/african-sunset.jpg'
            ],
            [
                'id' => 3,
                'Id' => 3,
                'name' => 'Turbo White Russian',
                'Name' => 'Turbo White Russian',
                'description' => 'Classic cocktail with an African twist',
                'Description' => 'Classic cocktail with an African twist',
                'difficulty' => 'Easy',
                'Difficulty' => 'Easy',
                'prepTime' => '3 minutes',
                'PrepTime' => '3 minutes',
                'ingredients' => [
                    'Turbo Cream Liqueur Original (60ml)',
                    'Vodka (45ml)',
                    'Cold brew coffee (30ml)'
                ],
                'Ingredients' => [
                    ['Name' => 'Turbo Cream Liqueur Original', 'Amount' => '60ml'],
                    ['Name' => 'Vodka', 'Amount' => '45ml'],
                    ['Name' => 'Cold brew coffee', 'Amount' => '30ml']
                ],
                'instructions' => [
                    'Fill old-fashioned glass with ice',
                    'Pour vodka and cold brew coffee',
                    'Gently float Turbo Cream Liqueur on top',
                    'Stir gently before drinking'
                ],
                'Instructions' => [
                    'Fill old-fashioned glass with ice',
                    'Pour vodka and cold brew coffee',
                    'Gently float Turbo Cream Liqueur on top',
                    'Stir gently before drinking'
                ],
                'image' => '/images/cocktails/turbo-white-russian.jpg',
                'ImageUrl' => '/images/cocktails/turbo-white-russian.jpg'
            ]
        ];

        sendJson($cocktails);
    }

    /**
     * GET /api/liqueur/serving-guide
     * Get serving suggestions and food pairings
     */
    public function getServingGuide() {
        $verificationToken = $this->getVerificationToken();

        if (empty($verificationToken)) {
            sendError('Age verification required.', 401);
        }

        $guide = [
            'OptimalTemperature' => 'Serve chilled at 6-8°C (43-46°F)',
            'StorageInstructions' => 'Store in cool place. Refrigerate after opening. Shake well before use.',
            'ServingMethods' => [
                [
                    'Name' => 'Neat',
                    'Description' => 'Pure Turbo experience in a small glass',
                    'Occasion' => 'After dinner, relaxation'
                ],
                [
                    'Name' => 'On the Rocks',
                    'Description' => 'Over ice in an old-fashioned glass',
                    'Occasion' => 'Evening wind-down, social gathering'
                ],
                [
                    'Name' => 'In Coffee',
                    'Description' => 'Add 30ml to hot coffee for luxury morning treat',
                    'Occasion' => 'Weekend mornings, special occasions'
                ],
                [
                    'Name' => 'With Desserts',
                    'Description' => 'Drizzle over ice cream, cakes, or fruit',
                    'Occasion' => 'Dinner parties, celebrations'
                ]
            ],
            'FoodPairings' => [
                ['Food' => 'Dark chocolate', 'Reason' => 'Complements cocoa notes'],
                ['Food' => 'Tiramisu', 'Reason' => 'Enhances coffee flavors'],
                ['Food' => 'Vanilla ice cream', 'Reason' => 'Classic cream combination'],
                ['Food' => 'African spiced cake', 'Reason' => 'Cultural flavor harmony'],
                ['Food' => 'Cheese platter', 'Reason' => 'Balances rich flavors']
            ],
            'Occasions' => [
                'Romantic dinners',
                'Cultural celebrations',
                'After-dinner drinks',
                'Special toasts',
                'Weekend relaxation',
                'Premium gifting'
            ]
        ];

        sendJson($guide);
    }

    /**
     * POST /api/liqueur/order
     * Place order for Turbo Cream Liqueur products
     */
    public function postOrder() {
        $request = getJsonInput();

        if (empty($request['VerificationToken'])) {
            sendError('Age verification required to purchase liqueur products.', 401);
        }

        if (!isset($request['Items']) || empty($request['Items'])) {
            sendError('Order must contain at least one item.', 400);
        }

        $products = [
            1 => ['Id' => 1, 'Name' => 'Turbo Cream Liqueur Original', 'Price' => 8500.00, 'AlcoholContent' => 18.0, 'Volume' => '250ml', 'IsAvailable' => true],
            2 => ['Id' => 2, 'Name' => 'Turbo Cream Gold Reserve', 'Price' => 12000.00, 'AlcoholContent' => 20.0, 'Volume' => '250ml', 'IsAvailable' => true],
            3 => ['Id' => 3, 'Name' => 'Turbo Cream Coffee Fusion', 'Price' => 9500.00, 'AlcoholContent' => 17.0, 'Volume' => '250ml', 'IsAvailable' => false]
        ];

        $orderItems = [];
        $total = 0;

        foreach ($request['Items'] as $item) {
            $productId = $item['ProductId'];

            if (!isset($products[$productId])) {
                sendError("Product with ID $productId not found.", 400);
            }

            $product = $products[$productId];

            if (!$product['IsAvailable']) {
                sendError("{$product['Name']} is currently not available.", 400);
            }

            $quantity = $item['Quantity'];
            $itemTotal = $product['Price'] * $quantity;
            $total += $itemTotal;

            $orderItems[] = [
                'ProductId' => $productId,
                'ProductName' => $product['Name'],
                'Quantity' => $quantity,
                'UnitPrice' => $product['Price'],
                'SubTotal' => $itemTotal,
                'AlcoholContent' => $product['AlcoholContent'],
                'Volume' => $product['Volume']
            ];
        }

        $shippingFee = 1500.00;

        $response = [
            'OrderId' => uniqid('liqueur_'),
            'Items' => $orderItems,
            'SubTotal' => $total,
            'ShippingFee' => $shippingFee,
            'Total' => $total + $shippingFee,
            'CustomerInfo' => $request['CustomerInfo'] ?? [],
            'ShippingAddress' => $request['ShippingAddress'] ?? [],
            'OrderDate' => date('c'),
            'EstimatedDelivery' => date('c', strtotime('+3 days')),
            'Status' => 'Pending Age Verification',
            'PaymentMethod' => $request['PaymentMethod'] ?? 'Card',
            'AgeVerificationRequired' => true,
            'LegalNotice' => 'By purchasing this product, you confirm you are 18+ years old and will consume responsibly.'
        ];

        logMessage("Liqueur order placed: {$response['OrderId']} for ₦{$response['Total']} - Age verification required");

        sendJson($response);
    }

    /**
     * GET /api/liqueur/responsible-drinking
     * Get responsible drinking information
     */
    public function getResponsibleDrinking() {
        $info = [
            'ageRequirement' => 'Must be 18 years or older',
            'AgeRequirement' => 'Must be 18 years or older',
            'guidelines' => [
                'Drink responsibly and in moderation',
                'Do not drink and drive',
                'Avoid alcohol during pregnancy',
                'Be aware of alcohol content (17-20% ABV)',
                'Store away from children'
            ],
            'ConsumptionGuidelines' => [
                'Drink responsibly and in moderation',
                'Do not drink and drive',
                'Avoid alcohol during pregnancy',
                'Be aware of alcohol content (17-20% ABV)',
                'Store away from children'
            ],
            'healthWarnings' => [
                'Excessive alcohol consumption is harmful to health',
                'Alcohol may interact with medications',
                'Consult doctor if you have health conditions',
                'Seek help if you have drinking problems'
            ],
            'HealthWarnings' => [
                'Excessive alcohol consumption is harmful to health',
                'Alcohol may interact with medications',
                'Consult doctor if you have health conditions',
                'Seek help if you have drinking problems'
            ],
            'helpline' => '+234 803 235 4952',
            'resources' => 'Visit www.mrcreamlimited.com for more information or contact us at info@mrcreamlimited.com',
            'SupportResources' => [
                'National Agency for Food and Drug Administration and Control (NAFDAC)',
                'Nigerian Medical Association',
                'Local healthcare providers'
            ],
            'legalNotice' => 'The sale and consumption of alcoholic beverages is regulated by Nigerian law. MrCream promotes responsible drinking.',
            'LegalNotice' => 'The sale and consumption of alcoholic beverages is regulated by Nigerian law. MrCream promotes responsible drinking.'
        ];

        sendJson($info);
    }
}
