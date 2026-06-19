import React, { createContext, useContext, useState } from 'react';
import type { Product } from '../types';

type Language = 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  tProduct: (product: Product) => {
    name: string;
    category: string;
    description: string;
    features: string[];
    howToUse: string;
    ingredients: string;
  };
}

const translations = {
  vi: {
    // Header
    'announcement_bar': 'Miễn phí giao hàng tiêu chuẩn cho đơn hàng từ $95 trở lên. ',
    'shop_now_link': 'Mua ngay',
    'nav_shop': 'Cửa hàng',
    'nav_new_arrivals': 'Hàng mới về',
    'nav_sales': 'Khuyến mãi',
    'nav_journal': 'Tạp chí',
    'search_placeholder': 'Tìm kiếm sản phẩm...',
    'stores': 'Cửa hàng',
    'cart': 'Giỏ hàng',
    
    // Header Dropdown Columns
    'menu_categories': 'Danh mục',
    'menu_featured': 'Nổi bật',
    'menu_collections': 'Bộ sưu tập',
    'menu_bags': 'Túi xách',
    'menu_clothing': 'Quần áo',
    'menu_leather': 'Đồ da',
    'menu_accessories': 'Phụ kiện',
    'menu_gifts': 'Quà tặng',
    'menu_shop_all': 'Mua tất cả',
    'menu_bestsellers': 'Bán chạy nhất',
    'menu_trending': 'Xu hướng',
    'menu_loungewear': 'Đồ mặc nhà',
    'menu_party': 'Tiệc tùng & Sự kiện',
    'menu_office': 'Trang phục công sở',
    'menu_selection': 'Bộ tuyển chọn',
    'menu_online_exclusive': 'Độc quyền online',
    'menu_knitwear': 'Đồ len',
    'menu_total_look': 'Trọn bộ phong cách',
    'menu_basics': 'Đồ cơ bản',

    // Footer
    'footer_contact_us': 'Liên hệ',
    'footer_customers': 'Khách hàng',
    'footer_company': 'Công ty',
    'footer_start_return': 'Bắt đầu đổi trả',
    'footer_return_policy': 'Chính sách đổi trả',
    'footer_faq': 'Hỏi đáp (FAQ)',
    'footer_catalogs': 'Danh mục & Mailers',
    'footer_group_gifting': 'Về quà tặng nhóm',
    'footer_about_us': 'Về chúng tôi',
    'footer_sustainability': 'Phát triển bền vững',
    'footer_discover_revive': 'Khám phá Revive',
    'footer_careers': 'Cơ hội nghề nghiệp',
    'footer_privacy_policy': 'Chính sách bảo mật',
    'footer_terms': 'Điều khoản sử dụng',
    'footer_subscribe_header': 'Nhận tin tức mới nhất từ chúng tôi',
    'footer_subscribe_placeholder': 'Nhập địa chỉ email của bạn',
    'footer_subscribe_agree': 'Bằng việc đăng ký, bạn đồng ý với Chính sách bảo mật và Điều khoản dịch vụ của chúng tôi.',
    'footer_subscribe_btn': 'Đăng ký',
    'footer_subscribed_msg': 'Cảm ơn bạn đã đăng ký!',

    // Home
    'hero_title': 'Nâng Tầm Phong Cách',
    'hero_subtitle': 'Thời Trang Bền Vững, Sự Lựa Chọn Vượt Thời Gian',
    'hero_shop_now': 'Mua Ngay',
    'intro_text': 'Nâng tầm phong cách sống với tủ đồ tinh tế và thông minh hơn.<br />Các sản phẩm của chúng tôi được chế tác bền vững với định hướng sử dụng lâu dài.',
    'editorial_new_arrivals': 'Hàng Mới Về',
    'editorial_casual_edit': 'Thời Trang Thường Nhật',
    'editorial_best_sellers': 'Sản Phẩm Bán Chạy',
    'what_to_wear_now': 'Gợi Ý Trang Phục Hôm Nay',
    'shop_all_items': 'Xem tất cả sản phẩm',
    'editorial_smart_chic': 'Phong Cách Thanh Lịch',
    'editorial_ready_to_go': 'Sẵn Sàng Xuống Phố',
    'philosophy_title': 'Nghệ Thuật Lựa Lựa Chọn: Ít Hơn Nhưng Chất Lượng Hơn',
    'philosophy_text': 'Lựa chọn chất lượng thay vì số lượng có nghĩa là chọn những sản phẩm vượt thời gian, bền bỉ và được sản xuất có trách nhiệm. Phương pháp này giúp đơn giản hóa cuộc sống của chúng ta và tạo ra sự trân trọng sâu sắc hơn đối với môi trường xung quanh. Tập trung vào tính bền bỉ và quy trình sản xuất có đạo đức sẽ tạo nên một phong cách sống bền vững và ý nghĩa hơn.',
    'shop_instagram': 'Mua sắm qua Instagram',
    'shop_look': 'Mua set này',

    // Product List
    'filter_refine': 'Bộ lọc',
    'filter_clear_all': 'Xóa tất cả',
    'filter_size': 'Kích cỡ',
    'filter_color': 'Màu sắc',
    'filter_max_price': 'Giá tối đa: ${price}',
    'sort_featured': 'Nổi bật',
    'sort_price_low': 'Giá: Thấp - Cao',
    'sort_price_high': 'Giá: Cao - Thấp',
    'sort_rating': 'Đánh giá cao nhất',
    'no_items_match': 'Không có sản phẩm nào phù hợp với bộ lọc của bạn.',
    'reset_refinement': 'Đặt lại bộ lọc',
    'added_to_wishlist': 'Đã thêm {name} vào danh sách yêu thích!',

    // Product Detail
    'add_to_bag': 'Thêm vào giỏ hàng',
    'tab_description': 'Mô tả',
    'tab_features': 'Chi tiết sản phẩm',
    'tab_care': 'Bảo quản',
    'tab_shipping': 'Vận chuyển',
    'based_on_reviews': 'Dựa trên {count} đánh giá',
    'style_with': 'Gợi ý phối đồ',
    'recently_viewed': 'Sản phẩm đã xem',

    // Shopping Bag Drawer
    'shopping_bag_header': 'Giỏ Hàng',
    'bag_empty': 'Giỏ hàng của bạn đang trống.',
    'go_to_checkout_btn': 'Thanh toán',
    'shipping_tax_note': 'Thuế & phí vận chuyển sẽ được tính tại trang thanh toán',

    // Cart Page
    'cart_page_title': 'Giỏ Hàng Của Bạn',
    'cart_page_desc': 'Kiểm tra trang phục của bạn, thêm ghi chú đóng gói và tiến hành thanh toán.',
    'cart_table_product': 'Sản phẩm',
    'cart_table_quantity': 'Số lượng',
    'cart_table_total': 'Thành tiền',
    'cart_remove': 'Xóa',
    'gift_message_checkbox': 'Thêm thông điệp quà tặng gửi kèm (Miễn phí)',
    'gift_to': 'Tới (Tên người nhận)',
    'gift_from': 'Từ (Tên người gửi)',
    'gift_message_label': 'Lời nhắn quà tặng',
    'gift_textarea_placeholder': 'Nhập lời chúc của bạn tại đây. Chúng tôi sẽ in trên thiệp GenX PKS cao cấp.',
    'coupon_title': 'Mã giảm giá',
    'coupon_placeholder': 'Mã (ví dụ: CEIN20)',
    'coupon_apply_btn': 'Áp dụng',
    'coupon_error_empty': 'Vui lòng nhập mã giảm giá.',
    'coupon_error_invalid': 'Mã giảm giá không hợp lệ. Thử mã CEIN20',
    'coupon_success_msg': 'Áp dụng mã {code} thành công! Giảm ngay {discount}%.',
    'order_summary': 'Tóm tắt đơn hàng',
    'order_subtotal': 'Tạm tính',
    'order_discount': 'Giảm giá ({percentage}%)',
    'order_shipping_fee': 'Phí vận chuyển',
    'order_shipping_free': 'Miễn phí',
    'order_shipping_note': 'Mua thêm {amount} để được miễn phí vận chuyển.',
    'order_grand_total': 'Tổng cộng',
    'proceed_to_checkout': 'Thực hiện thanh toán',

    // Checkout Success
    'checkout_success_title': 'Đặt hàng thành công!',
    'checkout_success_desc': 'Cảm ơn bạn đã mua sắm tại <strong>GenX PKS</strong>. Đơn hàng của bạn đang được chuẩn bị với sự tận tâm và tỉ mỉ nhất.',
    'checkout_order_id': 'Mã đơn hàng:',
    'checkout_est_delivery': 'Thời gian giao hàng dự kiến:',
    'checkout_est_delivery_val': '3 - 5 ngày làm việc',
    'checkout_shipping_method': 'Phương thức vận chuyển:',
    'checkout_shipping_method_val': 'Vận chuyển tiêu chuẩn nhanh, bảo đảm hàng hóa',
    'checkout_gift_msg_attached': 'Thông điệp quà tặng đính kèm',
    'checkout_go_home': 'Về trang chủ',
    'checkout_continue': 'Tiếp tục mua sắm',

    // Search Results
    'search_results_title': 'Kết quả tìm kiếm',
    'search_results_desc': 'Tìm thấy <strong>{count}</strong> sản phẩm phù hợp với từ khóa "<strong>{query}</strong>"',
    'search_empty_desc': 'Chúng tôi không tìm thấy trang phục nào phù hợp với từ khóa của bạn. Hãy thử tìm các sản phẩm cơ bản như "blazer", "cardigan", "silk" hoặc "pant".',
    
    // Quick View
    'view_full_details': 'Xem chi tiết sản phẩm',

    // Newsletter Popup
    'popup_exclusive_offer': 'Ưu đãi độc quyền',
    'popup_discount_title': 'Giảm ngay 15% cho đơn hàng đầu tiên',
    'popup_discount_desc': 'Đăng ký email của bạn để nhận mã giảm giá. Đồng thời là người đầu tiên nhận thông tin về các bộ sưu tập và sự kiện mới nhất.',
    'popup_unlock_btn': 'Nhận ưu đãi',
    'popup_success_title': 'Mở khóa ưu đãi thành công!',
    'popup_success_desc': 'Mã giảm giá 15% đã được áp dụng vào giỏ hàng của bạn.',
    'popup_closing_msg': 'Màn hình sẽ đóng lại sau vài giây...'
  },
  en: {
    // Header
    'announcement_bar': 'Complimentary U.S. No-Rush Shipping on orders of $95 or more. ',
    'shop_now_link': 'Shop now',
    'nav_shop': 'Shop',
    'nav_new_arrivals': 'New Arrivals',
    'nav_sales': 'Sales',
    'nav_journal': 'Journal',
    'search_placeholder': 'Search products...',
    'stores': 'Stores',
    'cart': 'Bag',
    
    // Header Dropdown Columns
    'menu_categories': 'Categories',
    'menu_featured': 'Featured',
    'menu_collections': 'Collections',
    'menu_bags': 'Bags',
    'menu_clothing': 'Clothing',
    'menu_leather': 'Leather Goods',
    'menu_accessories': 'Accessories',
    'menu_gifts': 'Gifts',
    'menu_shop_all': 'Shop All',
    'menu_bestsellers': 'Bestsellers',
    'menu_trending': 'Trending Now',
    'menu_loungewear': 'Loungewear',
    'menu_party': 'Party and events',
    'menu_office': 'Office looks',
    'menu_selection': 'Selection',
    'menu_online_exclusive': 'Online Exclusive',
    'menu_knitwear': 'Knitwear',
    'menu_total_look': 'Total Look',
    'menu_basics': 'Basics',

    // Footer
    'footer_contact_us': 'Contact Us',
    'footer_customers': 'Customers',
    'footer_company': 'Company',
    'footer_start_return': 'Start a Return',
    'footer_return_policy': 'Return Policy',
    'footer_faq': 'FAQ',
    'footer_catalogs': 'Catalogs and Mailers',
    'footer_group_gifting': 'About Group Gifting',
    'footer_about_us': 'About Us',
    'footer_sustainability': 'Sustainability',
    'footer_discover_revive': 'Discover Revive',
    'footer_careers': 'Careers',
    'footer_privacy_policy': 'Privacy Policy',
    'footer_terms': 'Terms',
    'footer_subscribe_header': 'Get the latest new from us',
    'footer_subscribe_placeholder': 'Enter your email address',
    'footer_subscribe_agree': 'By signing up, you agree to our Privacy Policy and Terms of Service.',
    'footer_subscribe_btn': 'Subscribe',
    'footer_subscribed_msg': 'Thank you for subscribing!',

    // Home
    'hero_title': 'Elevate Your Style',
    'hero_subtitle': 'Timeless Fashion, Sustainable Choices',
    'hero_shop_now': 'Shop Now',
    'intro_text': 'Elevate your lifestyle with a more intelligent, superior wardrobe.<br />Our range is crafted sustainably with longevity in mind.',
    'editorial_new_arrivals': 'New Arrivals',
    'editorial_casual_edit': 'The Casual Edit',
    'editorial_best_sellers': 'Best-Sellers',
    'what_to_wear_now': 'What to Wear Now',
    'shop_all_items': 'Shop All Items',
    'editorial_smart_chic': 'The Smart Chic',
    'editorial_ready_to_go': 'Ready To Go',
    'philosophy_title': 'The Art of Fewer, Better Choices',
    'philosophy_text': 'Opting for quality over quantity means selecting timeless, durable, and responsibly made items. This approach simplifies our lives and fosters a deeper appreciation for our surroundings. Emphasizing longevity and responsible production resonates with a more sustainable and mindful lifestyle.',
    'shop_instagram': 'Shop Instagram',
    'shop_look': 'Shop Look',

    // Product List
    'filter_refine': 'Refine',
    'filter_clear_all': 'Clear all',
    'filter_size': 'Size',
    'filter_color': 'Color',
    'filter_max_price': 'Max Price: ${price}',
    'sort_featured': 'Featured',
    'sort_price_low': 'Price: Low - High',
    'sort_price_high': 'Price: High - Low',
    'sort_rating': 'Top Rated',
    'no_items_match': 'No items match your refine options.',
    'reset_refinement': 'Reset Refinement',
    'added_to_wishlist': 'Added {name} to Wishlist!',

    // Product Detail
    'add_to_bag': 'Add to Bag',
    'tab_description': 'Description',
    'tab_features': 'Features',
    'tab_care': 'Fit & Care',
    'tab_shipping': 'Shipping & Returns',
    'based_on_reviews': 'Based on {count} reviews',
    'style_with': 'Style With',
    'recently_viewed': 'Recently viewed',

    // Shopping Bag Drawer
    'shopping_bag_header': 'Shopping Bag',
    'bag_empty': 'Your shopping bag is empty.',
    'go_to_checkout_btn': 'Go To Checkout',
    'shipping_tax_note': 'Shipping & taxes calculated at checkout',

    // Cart Page
    'cart_page_title': 'Your Shopping Cart',
    'cart_page_desc': 'Review your garments, add optional packaging notes, and proceed to checkout.',
    'cart_table_product': 'Product',
    'cart_table_quantity': 'Quantity',
    'cart_table_total': 'Total',
    'cart_remove': 'Remove',
    'gift_message_checkbox': 'Add a gift message to this order (Free)',
    'gift_to': 'To (Recipient Name)',
    'gift_from': 'From (Sender Name)',
    'gift_message_label': 'Gift Message',
    'gift_textarea_placeholder': 'Write your greeting message here. We will print it on a luxurious textured GenX PKS card.',
    'coupon_title': 'Promo Coupon Code',
    'coupon_placeholder': 'Code (e.g. CEIN20)',
    'coupon_apply_btn': 'Apply',
    'coupon_error_empty': 'Please enter a coupon code.',
    'coupon_error_invalid': 'Invalid coupon code. Try CEIN20',
    'coupon_success_msg': 'Success! Coupon {code} applied. Enjoy {discount}% off.',
    'order_summary': 'Order Summary',
    'order_subtotal': 'Subtotal',
    'order_discount': 'Discount ({percentage}%)',
    'order_shipping_fee': 'Shipping Fee',
    'order_shipping_free': 'FREE',
    'order_shipping_note': 'Add ${amount} more for free shipping.',
    'order_grand_total': 'Grand Total',
    'proceed_to_checkout': 'Proceed to Checkout',

    // Checkout Success
    'checkout_success_title': 'Order Placed Successfully!',
    'checkout_success_desc': 'Thank you for shopping with <strong>GenX PKS</strong>. Your order is being processed with careful attention to detail.',
    'checkout_order_id': 'Order ID:',
    'checkout_est_delivery': 'Estimated Delivery:',
    'checkout_est_delivery_val': '3 - 5 Business Days',
    'checkout_shipping_method': 'Shipping Method:',
    'checkout_shipping_method_val': 'Standard Secure Insured Express',
    'checkout_gift_msg_attached': 'Gift Message Attached',
    'checkout_go_home': 'Go to Home',
    'checkout_continue': 'Continue Shopping',

    // Search Results
    'search_results_title': 'Search Results',
    'search_results_desc': 'Found <strong>{count}</strong> items matching your search for "<strong>{query}</strong>"',
    'search_empty_desc': "We couldn't find any clothing pieces matching your search term. Try searching for essentials like 'blazer', 'cardigan', 'silk', or 'pant'.",
    
    // Quick View
    'view_full_details': 'View full details',

    // Newsletter Popup
    'popup_exclusive_offer': 'Exclusive Offer',
    'popup_discount_title': '15% off your first order',
    'popup_discount_desc': 'Enter your email to unlock. Plus, get insider access to promotions, launches, events, and more.',
    'popup_unlock_btn': 'Unlock Access',
    'popup_success_title': 'Access Unlocked!',
    'popup_success_desc': '15% discount has been applied to your bag.',
    'popup_closing_msg': 'Closing this screen shortly...'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Vietnamese as default as requested ("Chuyển ngôn ngữ về tiếng việt cho toàn trang web")
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('genxpks_language');
    return (saved as Language) || 'vi';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('genxpks_language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const dict = translations[language];
    let value = (dict as any)[key] || (translations['en'] as any)[key] || key;
    
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        value = value.replace(`{${k}}`, String(v));
      });
    }
    return value;
  };

  const tProduct = (product: Product) => {
    if (language === 'vi') {
      return {
        name: product.nameVi || product.name,
        category: product.categoryVi || product.category,
        description: product.descriptionVi || product.description,
        features: product.featuresVi || product.features || [],
        howToUse: product.howToUseVi || product.howToUse || '',
        ingredients: product.ingredientsVi || product.ingredients || ''
      };
    }
    return {
      name: product.name,
      category: product.category,
      description: product.description,
      features: product.features || [],
      howToUse: product.howToUse || '',
      ingredients: product.ingredients || ''
    };
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tProduct }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
