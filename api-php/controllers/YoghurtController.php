<?php
/**
 * Yoghurt Controller
 * Handles all yoghurt product related endpoints
 */

class YoghurtController {

    /**
     * GET /api/yoghurt/flavours
     * Get all available yoghurt flavours
     */
    public function getFlavours($id = null) {
        if ($id !== null) {
            // Handle /api/yoghurt/flavours/{id}
            return $this->getFlavour($id);
        }

        $flavours = [
            [
                'id' => 1,
                'Id' => 1, // Keep for backward compatibility
                'name' => 'Strawberry',
                'fullName' => 'MrCream Strawberry Flavoured Sweetened Yoghurt',
                'Name' => 'MrCream Strawberry', // Keep for backward compatibility
                'description' => 'Sweet, creamy, and timeless. Our strawberry yoghurt drink is a classic favorite, with just the right blend of tang and berry-rich flavor.',
                'Description' => 'Sweet, creamy, and timeless. Our strawberry yoghurt drink is a classic favorite, with just the right blend of tang and berry-rich flavor.',
                'Price' => 300.00,
                'Size' => '500ml',
                'ImageUrl' => '/images/yoghurt/strawberry.jpg',
                'IsAvailable' => true,
                'NutritionalInfo' => [
                    'Calories' => 180,
                    'Protein' => '8g',
                    'Calcium' => '25% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ],
            [
                'id' => 2,
                'Id' => 2,
                'name' => 'Vanilla',
                'fullName' => 'MrCream Vanilla Flavoured Sweetened Yoghurt',
                'Name' => 'MrCream Vanilla',
                'description' => 'Mellow, smooth, and aromatic. Vanilla lovers will enjoy this elegant twist on creamy indulgence — perfect chilled!',
                'Description' => 'Mellow, smooth, and aromatic. Vanilla lovers will enjoy this elegant twist on creamy indulgence — perfect chilled!',
                'Price' => 300.00,
                'Size' => '500ml',
                'ImageUrl' => '/images/yoghurt/vanilla.jpg',
                'IsAvailable' => true,
                'NutritionalInfo' => [
                    'Calories' => 170,
                    'Protein' => '8g',
                    'Calcium' => '25% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ],
            [
                'id' => 3,
                'Id' => 3,
                'name' => 'Greek Style',
                'fullName' => 'MrCream Greek Style Yoghurt',
                'Name' => 'MrCream Greek Style',
                'description' => 'Coming Soon - Thick, rich, and protein-packed Greek yoghurt experience.',
                'Description' => 'Coming Soon - Thick, rich, and protein-packed Greek yoghurt experience.',
                'Price' => 350.00,
                'Size' => '400ml',
                'ImageUrl' => '/images/yoghurt/greek.jpg',
                'IsAvailable' => false,
                'NutritionalInfo' => [
                    'Calories' => 150,
                    'Protein' => '15g',
                    'Calcium' => '30% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ]
        ];

        sendJson($flavours);
    }

    /**
     * GET /api/yoghurt/flavours/{id}
     * Get specific yoghurt flavour by ID
     */
    public function getFlavour($id) {
        $flavours = [
            1 => [
                'id' => 1,
                'Id' => 1,
                'name' => 'Strawberry',
                'fullName' => 'MrCream Strawberry Flavoured Sweetened Yoghurt',
                'Name' => 'MrCream Strawberry',
                'description' => 'Sweet, creamy, and timeless. Our strawberry yoghurt drink is a classic favorite, with just the right blend of tang and berry-rich flavor.',
                'Description' => 'Sweet, creamy, and timeless. Our strawberry yoghurt drink is a classic favorite, with just the right blend of tang and berry-rich flavor.',
                'Price' => 300.00,
                'Size' => '500ml',
                'ImageUrl' => '/images/yoghurt/strawberry.jpg',
                'IsAvailable' => true,
                'NutritionalInfo' => [
                    'Calories' => 180,
                    'Protein' => '8g',
                    'Calcium' => '25% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ],
            2 => [
                'id' => 2,
                'Id' => 2,
                'name' => 'Vanilla',
                'fullName' => 'MrCream Vanilla Flavoured Sweetened Yoghurt',
                'Name' => 'MrCream Vanilla',
                'description' => 'Mellow, smooth, and aromatic. Vanilla lovers will enjoy this elegant twist on creamy indulgence — perfect chilled!',
                'Description' => 'Mellow, smooth, and aromatic. Vanilla lovers will enjoy this elegant twist on creamy indulgence — perfect chilled!',
                'Price' => 300.00,
                'Size' => '500ml',
                'ImageUrl' => '/images/yoghurt/vanilla.jpg',
                'IsAvailable' => true,
                'NutritionalInfo' => [
                    'Calories' => 170,
                    'Protein' => '8g',
                    'Calcium' => '25% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ],
            3 => [
                'id' => 3,
                'Id' => 3,
                'name' => 'Greek Style',
                'fullName' => 'MrCream Greek Style Yoghurt',
                'Name' => 'MrCream Greek Style',
                'description' => 'Coming Soon - Thick, rich, and protein-packed Greek yoghurt experience.',
                'Description' => 'Coming Soon - Thick, rich, and protein-packed Greek yoghurt experience.',
                'Price' => 350.00,
                'Size' => '400ml',
                'ImageUrl' => '/images/yoghurt/greek.jpg',
                'IsAvailable' => false,
                'NutritionalInfo' => [
                    'Calories' => 150,
                    'Protein' => '15g',
                    'Calcium' => '30% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ]
        ];

        if (!isset($flavours[$id])) {
            sendError("Yoghurt flavour with ID $id not found.", 404);
        }

        sendJson($flavours[$id]);
    }

    /**
     * POST /api/yoghurt/order
     * Place an order for yoghurt drinks
     */
    public function postOrder() {
        $request = getJsonInput();

        if (!isset($request['Items']) || empty($request['Items'])) {
            sendError('Order must contain at least one item.', 400);
        }

        $flavours = [
            1 => ['Id' => 1, 'id' => 1, 'Name' => 'MrCream Strawberry', 'name' => 'Strawberry', 'Price' => 300.00, 'IsAvailable' => true],
            2 => ['Id' => 2, 'id' => 2, 'Name' => 'MrCream Vanilla', 'name' => 'Vanilla', 'Price' => 300.00, 'IsAvailable' => true],
            3 => ['Id' => 3, 'id' => 3, 'Name' => 'MrCream Greek Style', 'name' => 'Greek Style', 'Price' => 350.00, 'IsAvailable' => false]
        ];

        $orderItems = [];
        $total = 0;

        foreach ($request['Items'] as $item) {
            $flavourId = $item['FlavourId'];

            if (!isset($flavours[$flavourId])) {
                sendError("Flavour with ID $flavourId not found.", 400);
            }

            $flavour = $flavours[$flavourId];

            if (!$flavour['IsAvailable']) {
                sendError("{$flavour['Name']} is currently not available.", 400);
            }

            $quantity = $item['Quantity'];
            $itemTotal = $flavour['Price'] * $quantity;
            $total += $itemTotal;

            $orderItems[] = [
                'FlavourId' => $flavourId,
                'FlavourName' => $flavour['Name'],
                'Quantity' => $quantity,
                'UnitPrice' => $flavour['Price'],
                'SubTotal' => $itemTotal
            ];
        }

        $hasDeliveryAddress = isset($request['DeliveryAddress']) && !empty($request['DeliveryAddress']);
        $deliveryFee = $hasDeliveryAddress ? 500.00 : 0.00;

        $response = [
            'OrderId' => uniqid('order_'),
            'Items' => $orderItems,
            'SubTotal' => $total,
            'DeliveryFee' => $deliveryFee,
            'Total' => $total + $deliveryFee,
            'CustomerInfo' => $request['CustomerInfo'] ?? [],
            'DeliveryAddress' => $request['DeliveryAddress'] ?? null,
            'OrderDate' => date('c'),
            'EstimatedDelivery' => $hasDeliveryAddress ? date('c', strtotime('+2 hours')) : date('c', strtotime('+30 minutes')),
            'Status' => 'Confirmed',
            'PaymentMethod' => $request['PaymentMethod'] ?? 'Cash'
        ];

        logMessage("Yoghurt order placed: {$response['OrderId']} for ₦{$response['Total']}");

        sendJson($response);
    }

    /**
     * GET /api/yoghurt/nutrition
     * Get nutritional information for all flavours
     */
    public function getNutrition() {
        $nutrition = [
            [
                'Id' => 1,
                'Name' => 'MrCream Strawberry',
                'Nutrition' => [
                    'Calories' => 180,
                    'Protein' => '8g',
                    'Calcium' => '25% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ],
            [
                'Id' => 2,
                'Name' => 'MrCream Vanilla',
                'Nutrition' => [
                    'Calories' => 170,
                    'Protein' => '8g',
                    'Calcium' => '25% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ],
            [
                'Id' => 3,
                'Name' => 'MrCream Greek Style',
                'Nutrition' => [
                    'Calories' => 150,
                    'Protein' => '15g',
                    'Calcium' => '30% DV',
                    'Probiotics' => 'Live cultures'
                ]
            ]
        ];

        sendJson($nutrition);
    }

    /**
     * GET /api/yoghurt/stores
     * Get store locations where yoghurt is available
     */
    public function getStores() {
        $stores = [
            [
                'Id' => 1,
                'Name' => 'MrCream Head Office Store',
                'Address' => '18-26 Dauda Ayorinde Street Adaloko, Afromedia, off Badagry Expressway, Lagos State',
                'Phone' => '+234 803 235 4952',
                'IsOpen' => true,
                'OpeningHours' => 'Mon-Fri: 8AM-6PM, Sat-Sun: 9AM-5PM'
            ],
            [
                'Id' => 2,
                'Name' => 'Shoprite - Various Locations',
                'Address' => 'Multiple locations across Lagos',
                'Phone' => 'Contact individual stores',
                'IsOpen' => true,
                'OpeningHours' => 'Daily: 8AM-10PM'
            ]
        ];

        sendJson($stores);
    }
}
