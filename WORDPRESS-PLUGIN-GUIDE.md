# 🔌 Creating a Custom WordPress/WooCommerce Plugin

## When to Use a WordPress Plugin vs Next.js Components

### Use **Next.js Components** (Recommended) for:
✅ Custom product displays
✅ Special layouts and sections  
✅ Custom animations and effects
✅ Frontend filtering and sorting
✅ Modern, fast user interfaces

### Use **WordPress Plugin** for:
✅ Custom checkout logic
✅ Backend automation (emails, inventory)
✅ Admin dashboard features
✅ Payment gateway modifications
✅ Shipping calculations
✅ Loyalty programs / points system
✅ Custom REST API endpoints

---

## Creating Your Own WooCommerce Plugin

### Plugin Structure
```
wp-content/plugins/vip-women-custom/
├── vip-women-custom.php        ← Main plugin file
├── includes/
│   ├── class-product-filters.php
│   ├── class-custom-checkout.php
│   └── class-loyalty-points.php
├── admin/
│   ├── settings.php
│   └── admin-dashboard.php
└── assets/
    ├── css/
    └── js/
```

---

## Example Plugin: VIP Women Custom Features

### Main Plugin File

```php
<?php
/**
 * Plugin Name: VIP Women Custom Features
 * Description: Custom functionality for VIP For Women e-commerce site
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: vip-women-custom
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Plugin constants
define('VIP_WOMEN_VERSION', '1.0.0');
define('VIP_WOMEN_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('VIP_WOMEN_PLUGIN_URL', plugin_dir_url(__FILE__));

/**
 * Main Plugin Class
 */
class VIP_Women_Custom {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Initialize plugin
        add_action('plugins_loaded', array($this, 'init'));
    }
    
    public function init() {
        // Check if WooCommerce is active
        if (!class_exists('WooCommerce')) {
            add_action('admin_notices', array($this, 'woocommerce_missing_notice'));
            return;
        }
        
        // Load plugin features
        $this->load_features();
    }
    
    private function load_features() {
        // Load custom features
        require_once VIP_WOMEN_PLUGIN_DIR . 'includes/class-custom-endpoints.php';
        require_once VIP_WOMEN_PLUGIN_DIR . 'includes/class-loyalty-points.php';
        require_once VIP_WOMEN_PLUGIN_DIR . 'includes/class-sale-badge.php';
        
        // Initialize features
        VIP_Custom_Endpoints::get_instance();
        VIP_Loyalty_Points::get_instance();
        VIP_Sale_Badge::get_instance();
    }
    
    public function woocommerce_missing_notice() {
        echo '<div class="error"><p>';
        echo __('VIP Women Custom Features requires WooCommerce to be installed and active.', 'vip-women-custom');
        echo '</p></div>';
    }
}

// Initialize plugin
VIP_Women_Custom::get_instance();
```

---

## Feature 1: Custom REST API Endpoints

```php
<?php
// includes/class-custom-endpoints.php

class VIP_Custom_Endpoints {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('rest_api_init', array($this, 'register_endpoints'));
    }
    
    public function register_endpoints() {
        
        // Get flash sale products
        register_rest_route('vip-women/v1', '/flash-sale', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_flash_sale_products'),
            'permission_callback' => '__return_true'
        ));
        
        // Get best sellers
        register_rest_route('vip-women/v1', '/best-sellers', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_best_sellers'),
            'permission_callback' => '__return_true'
        ));
        
        // Get products by occasion
        register_rest_route('vip-women/v1', '/occasion/(?P<occasion>[a-zA-Z0-9-]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_products_by_occasion'),
            'permission_callback' => '__return_true'
        ));
    }
    
    /**
     * Get flash sale products
     */
    public function get_flash_sale_products($request) {
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 8,
            'meta_query' => array(
                array(
                    'key' => '_sale_price',
                    'value' => '',
                    'compare' => '!='
                ),
                array(
                    'key' => '_flash_sale',
                    'value' => 'yes',
                    'compare' => '='
                )
            )
        );
        
        $products = wc_get_products($args);
        $data = array();
        
        foreach ($products as $product) {
            $data[] = $this->format_product($product);
        }
        
        return rest_ensure_response($data);
    }
    
    /**
     * Get best selling products
     */
    public function get_best_sellers($request) {
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 12,
            'meta_key' => 'total_sales',
            'orderby' => 'meta_value_num',
            'order' => 'DESC'
        );
        
        $products = wc_get_products($args);
        $data = array();
        
        foreach ($products as $product) {
            $data[] = $this->format_product($product);
        }
        
        return rest_ensure_response($data);
    }
    
    /**
     * Get products by occasion
     */
    public function get_products_by_occasion($request) {
        $occasion = $request['occasion'];
        
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => -1,
            'tax_query' => array(
                array(
                    'taxonomy' => 'product_tag',
                    'field' => 'slug',
                    'terms' => $occasion
                )
            )
        );
        
        $products = wc_get_products($args);
        $data = array();
        
        foreach ($products as $product) {
            $data[] = $this->format_product($product);
        }
        
        return rest_ensure_response($data);
    }
    
    /**
     * Format product data
     */
    private function format_product($product) {
        return array(
            'id' => $product->get_id(),
            'name' => $product->get_name(),
            'price' => $product->get_price(),
            'regular_price' => $product->get_regular_price(),
            'sale_price' => $product->get_sale_price(),
            'on_sale' => $product->is_on_sale(),
            'stock_status' => $product->get_stock_status(),
            'image' => wp_get_attachment_url($product->get_image_id()),
            'permalink' => get_permalink($product->get_id()),
        );
    }
}
```

---

## Feature 2: Loyalty Points System

```php
<?php
// includes/class-loyalty-points.php

class VIP_Loyalty_Points {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Award points on purchase
        add_action('woocommerce_order_status_completed', array($this, 'award_points'));
        
        // Redeem points at checkout
        add_action('woocommerce_cart_calculate_fees', array($this, 'apply_points_discount'));
        
        // Add points to REST API
        add_filter('woocommerce_rest_prepare_customer', array($this, 'add_points_to_api'), 10, 2);
    }
    
    /**
     * Award points when order is completed
     */
    public function award_points($order_id) {
        $order = wc_get_order($order_id);
        $customer_id = $order->get_customer_id();
        
        if (!$customer_id) {
            return;
        }
        
        // Award 1 point per $1 spent
        $points = floor($order->get_total());
        
        // Get current points
        $current_points = get_user_meta($customer_id, 'vip_loyalty_points', true);
        $current_points = $current_points ? intval($current_points) : 0;
        
        // Add new points
        $new_total = $current_points + $points;
        update_user_meta($customer_id, 'vip_loyalty_points', $new_total);
        
        // Log transaction
        $this->log_points_transaction($customer_id, $points, 'earned', $order_id);
        
        // Send email notification
        $this->send_points_email($customer_id, $points, $new_total);
    }
    
    /**
     * Apply points discount at checkout
     */
    public function apply_points_discount() {
        if (!is_user_logged_in()) {
            return;
        }
        
        $customer_id = get_current_user_id();
        $points_to_use = WC()->session->get('vip_points_to_use', 0);
        
        if ($points_to_use <= 0) {
            return;
        }
        
        $available_points = get_user_meta($customer_id, 'vip_loyalty_points', true);
        
        if ($points_to_use > $available_points) {
            return;
        }
        
        // Convert points to discount (100 points = $10 discount)
        $discount = ($points_to_use / 100) * 10;
        
        WC()->cart->add_fee('Loyalty Points Discount', -$discount);
    }
    
    /**
     * Add points to customer REST API response
     */
    public function add_points_to_api($response, $customer) {
        $points = get_user_meta($customer->get_id(), 'vip_loyalty_points', true);
        $response->data['loyalty_points'] = $points ? intval($points) : 0;
        
        return $response;
    }
    
    /**
     * Log points transaction
     */
    private function log_points_transaction($customer_id, $points, $type, $order_id = 0) {
        global $wpdb;
        
        $table = $wpdb->prefix . 'vip_points_log';
        
        $wpdb->insert($table, array(
            'customer_id' => $customer_id,
            'points' => $points,
            'type' => $type,
            'order_id' => $order_id,
            'date' => current_time('mysql')
        ));
    }
    
    /**
     * Send points notification email
     */
    private function send_points_email($customer_id, $points, $total) {
        $customer = new WC_Customer($customer_id);
        $email = $customer->get_email();
        
        $subject = 'You earned ' . $points . ' loyalty points!';
        $message = "Congratulations!\n\n";
        $message .= "You've earned {$points} loyalty points.\n";
        $message .= "Your new points balance: {$total}\n\n";
        $message .= "Use your points on your next purchase!";
        
        wp_mail($email, $subject, $message);
    }
}
```

---

## Feature 3: Custom Sale Badges

```php
<?php
// includes/class-sale-badge.php

class VIP_Sale_Badge {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Add custom product meta
        add_action('woocommerce_product_options_general_product_data', array($this, 'add_sale_badge_field'));
        add_action('woocommerce_process_product_meta', array($this, 'save_sale_badge_field'));
        
        // Add badge to REST API
        add_filter('woocommerce_rest_prepare_product_object', array($this, 'add_badge_to_api'), 10, 2);
    }
    
    /**
     * Add sale badge field in admin
     */
    public function add_sale_badge_field() {
        global $post;
        
        echo '<div class="options_group">';
        
        woocommerce_wp_select(array(
            'id' => '_sale_badge',
            'label' => __('Sale Badge', 'vip-women-custom'),
            'options' => array(
                '' => __('None', 'vip-women-custom'),
                'flash-sale' => __('Flash Sale', 'vip-women-custom'),
                'hot-deal' => __('Hot Deal', 'vip-women-custom'),
                'limited-time' => __('Limited Time', 'vip-women-custom'),
                'best-seller' => __('Best Seller', 'vip-women-custom'),
                'new-arrival' => __('New Arrival', 'vip-women-custom'),
            )
        ));
        
        echo '</div>';
    }
    
    /**
     * Save sale badge field
     */
    public function save_sale_badge_field($post_id) {
        $badge = isset($_POST['_sale_badge']) ? sanitize_text_field($_POST['_sale_badge']) : '';
        update_post_meta($post_id, '_sale_badge', $badge);
    }
    
    /**
     * Add badge to REST API response
     */
    public function add_badge_to_api($response, $product) {
        $badge = get_post_meta($product->get_id(), '_sale_badge', true);
        $response->data['sale_badge'] = $badge ? $badge : '';
        
        return $response;
    }
}
```

---

## Installing Your Plugin

### Step 1: Create Plugin Folder
```bash
# On your WordPress server (Bluehost)
cd /home/yourusername/public_html/wp-content/plugins
mkdir vip-women-custom
```

### Step 2: Upload Files
Upload via:
- FTP (FileZilla)
- Bluehost File Manager
- Git deployment

### Step 3: Activate
1. Go to WordPress Admin → Plugins
2. Find "VIP Women Custom Features"
3. Click "Activate"

---

## Using Custom Endpoints in Next.js

```typescript
// lib/vip-api.ts

const VIP_API_BASE = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL + '/wp-json/vip-women/v1'

export async function getFlashSaleProducts() {
  const response = await fetch(`${VIP_API_BASE}/flash-sale`)
  return response.json()
}

export async function getBestSellers() {
  const response = await fetch(`${VIP_API_BASE}/best-sellers`)
  return response.json()
}

export async function getProductsByOccasion(occasion: string) {
  const response = await fetch(`${VIP_API_BASE}/occasion/${occasion}`)
  return response.json()
}

export async function getCustomerPoints(customerId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/wp-json/wc/v3/customers/${customerId}`,
    {
      headers: {
        'Authorization': 'Basic ' + btoa(`${WC_KEY}:${WC_SECRET}`)
      }
    }
  )
  const data = await response.json()
  return data.loyalty_points || 0
}
```

---

## Database Tables for Plugin

```php
// Create tables on plugin activation
register_activation_hook(__FILE__, 'vip_women_create_tables');

function vip_women_create_tables() {
    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();
    
    // Points log table
    $table_name = $wpdb->prefix . 'vip_points_log';
    
    $sql = "CREATE TABLE $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        customer_id bigint(20) NOT NULL,
        points int(11) NOT NULL,
        type varchar(20) NOT NULL,
        order_id bigint(20) DEFAULT 0,
        date datetime DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        KEY customer_id (customer_id)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
```

---

## Recommended Plugins to Extend

Instead of building everything from scratch, consider these:

1. **WooCommerce Subscriptions** - Recurring payments
2. **WooCommerce Bookings** - Appointment scheduling
3. **Advanced Custom Fields (ACF)** - Custom product fields
4. **YITH WooCommerce Wishlist** - Wishlist functionality
5. **WooCommerce Points and Rewards** - Loyalty system

---

## Summary

**For Your Site:**
- ✨ **Use Next.js components** for all visual/layout customizations
- 🔌 **Use WordPress plugin** only for backend logic, custom API endpoints, and automation

**Next Steps:**
1. Start with Next.js components (easier, faster)
2. Add WordPress plugin later if needed for advanced features
3. Most e-commerce sites don't need custom plugins

---

## Need Help?

Want to build a specific feature? Let me know:
- What backend functionality you need
- What the plugin should do
- I can write the complete plugin code!
