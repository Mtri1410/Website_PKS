import type { Product } from '../types';
import blazerImg from '../assets/product_blazer.webp';
import cardiganImg from '../assets/product_cardigan.webp';
import pantsImg from '../assets/product_pants.webp';
import classicPantImg from '../assets/product_classic_pant.webp';
import maxiSkirtImg from '../assets/product_maxi_skirt.webp';
import cashmereSweaterImg from '../assets/product_cashmere_sweater.webp';
import oversizedShirtImg from '../assets/product_oversized_shirt.webp';
import funnelNeckImg from '../assets/product_funnel_neck.webp';
import cashmereCardiganImg from '../assets/product_cashmere_cardigan.webp';
import turtleneckImg from '../assets/product_turtleneck.webp';
import drapedSkirtImg from '../assets/product_draped_skirt.webp';
import shortsImg from '../assets/product_shorts.webp';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'c1',
    name: 'Relaxed blazer',
    nameVi: 'Áo khoác Blazer phom rộng',
    category: 'Outerwear',
    categoryVi: 'Áo khoác',
    price: 348,
    rating: 4.8,
    ratingCount: 42,
    image: blazerImg,
    description: 'A contemporary tailored blazer with a relaxed silhouette, crafted from fine wool blend. Featuring structured shoulders, a single-button closure, and clean welt pockets.',
    descriptionVi: 'Áo blazer thiết kế đương đại dáng suông rộng rãi, được may từ len pha cao cấp. Thiết kế đệm vai nhẹ, cài một khuy và túi cơi thanh lịch.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#E2D3C1' },
      { name: 'Black', hex: '#111111' }
    ],
    features: [
      'Tailored relaxed fit',
      'Fully lined with premium acetate lining',
      'Structured shoulders and classic notch lapels',
      'Crafted in Portugal'
    ],
    featuresVi: [
      'Dáng blazer rộng thanh lịch',
      'Lớp lót toàn bộ bằng vải acetate cao cấp',
      'Đệm vai và ve áo nhọn cổ điển',
      'Sản xuất tại Bồ Đào Nha'
    ],
    howToUse: 'Dry clean only. Hang on a wide wooden hanger to maintain shoulder structure.',
    howToUseVi: 'Chỉ giặt khô. Treo trên móc gỗ bản rộng để giữ phom dáng vai.',
    ingredients: 'Outer: 80% Virgin Wool, 20% Nylon. Lining: 100% Viscose.',
    ingredientsVi: 'Vải ngoài: 80% Len nguyên chất, 20% Nylon. Vải lót: 100% Viscose.',
    material: 'Pima',
    materialVi: 'Len Pima'
  },
  {
    id: 'c2',
    name: 'Alpaca Wool Cropped Cardigan',
    nameVi: 'Áo khoác Cardigan len lông cừu Alpaca dáng lửng',
    category: 'Outerwear',
    categoryVi: 'Áo khoác',
    price: 248,
    rating: 4.9,
    ratingCount: 38,
    image: cardiganImg,
    description: 'An exceptionally soft cropped cardigan knit from a blend of premium baby alpaca wool. Designed with a deep V-neck, organic button closures, and ribbed cuffs.',
    descriptionVi: 'Áo cardigan dáng lửng siêu mềm mại được dệt từ len lông cừu baby alpaca cao cấp. Thiết kế cổ chữ V sâu, khuy cài tự nhiên và gấu tay bo thun.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#E4D5C3' },
      { name: 'Black', hex: '#111111' },
      { name: 'Light Blue', hex: '#8FA9C4' }
    ],
    features: [
      'Chunky knit texture',
      'Ribbed trim and hemline',
      'Responsible Wool Standard certified',
      'Cropped design ideal for high-waisted pairings'
    ],
    featuresVi: [
      'Vân dệt len sợi dày dặn',
      'Cổ áo và gấu bo thun',
      'Đạt chứng nhận Tiêu chuẩn Len có Trách nhiệm (RWS)',
      'Thiết kế dáng lửng lý tưởng phối với quần/váy cạp cao'
    ],
    howToUse: 'Hand wash cold. Lay flat to dry. Do not hang knitwear to prevent stretching.',
    howToUseVi: 'Giặt tay bằng nước lạnh. Trải phẳng để khô. Không treo móc để tránh giãn len.',
    ingredients: '70% Baby Alpaca, 23% Polyamide, 7% Merino Wool.',
    ingredientsVi: '70% Baby Alpaca, 23% Polyamide, 7% Len Merino.',
    material: 'Pima',
    materialVi: 'Len Pima'
  },
  {
    id: 'c3',
    name: 'Silk Wide-Leg Pant',
    nameVi: 'Quần lụa ống rộng',
    category: 'Pants & Leggings',
    categoryVi: 'Quần dài',
    price: 24,
    rating: 4.6,
    ratingCount: 15,
    image: pantsImg,
    description: 'A flowing wide-leg trousers cut from premium heavy silk charmeuse. Elevated with an elasticated waistband and side pockets for casual luxury.',
    descriptionVi: 'Quần dài ống rộng mềm mại được cắt từ vải lụa satin charmeuse dày dặn cao cấp. Thiết kế cạp thun co giãn và túi bên hông mang lại vẻ sang trọng tự nhiên.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#111111' }
    ],
    features: [
      'Full length wide-leg draft',
      'Elastic pull-on waistband',
      'Functional side seam pockets',
      'Luxurious liquid shine texture'
    ],
    featuresVi: [
      'Ống rộng dài phủ gót',
      'Cạp thun co giãn dễ mặc',
      'Túi chéo hai bên hông tiện dụng',
      'Chất liệu satin bóng mượt sang trọng'
    ],
    howToUse: 'Hand wash cold with delicate detergent or dry clean. Iron inside out on low silk setting.',
    howToUseVi: 'Giặt tay bằng nước lạnh với nước giặt dịu nhẹ hoặc giặt khô. Ủi mặt trái ở chế độ lụa thấp.',
    ingredients: '100% Mulberry Silk.',
    ingredientsVi: '100% Lụa tơ tằm Mulberry.',
    material: 'Silk',
    materialVi: 'Lụa'
  },
  {
    id: 'c4',
    name: 'Classic Pant',
    nameVi: 'Quần âu cổ điển',
    category: 'Pants & Leggings',
    categoryVi: 'Quần dài',
    price: 58,
    rating: 4.7,
    ratingCount: 56,
    image: classicPantImg,
    description: 'A versatile straight-leg pant designed for modern everyday wardrobe. Constructed with premium crease-resistant tech-stretch fabric and smart front pleats.',
    descriptionVi: 'Quần tây ống đứng đa năng cho tủ đồ hiện đại hàng ngày. Được may từ chất liệu vải co giãn chống nhăn cao cấp với nếp ly trước thanh lịch.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Grey', hex: '#808080' },
      { name: 'Sand', hex: '#E8C39E' }
    ],
    features: [
      'Straight leg fit with pressed creases',
      'Mid-rise with belt loop details',
      'Slash pockets and back button pockets',
      'Crease-resistant blend'
    ],
    featuresVi: [
      'Ống đứng xếp ly đứng dáng',
      'Cạp vừa với chi tiết đỉa quần',
      'Túi chéo và túi sau có cúc',
      'Chất liệu vải pha chống nhăn'
    ],
    howToUse: 'Machine wash cold on gentle cycle. Hang dry immediately. Warm iron if necessary.',
    howToUseVi: 'Giặt máy bằng nước lạnh với chu kỳ nhẹ nhàng. Treo khô ngay. Ủi ấm nếu cần.',
    ingredients: '68% Polyester, 29% Viscose, 3% Elastane.',
    ingredientsVi: '68% Polyester, 29% Viscose, 3% Elastane.',
    material: 'Cotton',
    materialVi: 'Cotton'
  },
  {
    id: 'c5',
    name: 'Maxi Skirt',
    nameVi: 'Chân váy Maxi dáng dài',
    category: 'Skirts',
    categoryVi: 'Chân váy',
    price: 248,
    rating: 4.5,
    ratingCount: 22,
    image: maxiSkirtImg,
    description: 'An elegant column maxi skirt draping beautifully below the ankle. Tailored with a clean side zipper closure and a slight back vent for walking comfort.',
    descriptionVi: 'Chân váy maxi dáng suông đứng thanh lịch rủ nhẹ nhàng dưới mắt cá chân. Thiết kế khóa kéo hông tinh tế và xẻ tà nhẹ phía sau giúp di chuyển dễ dàng.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#111111' }
    ],
    features: [
      'Column silhouette, ankle-length',
      'Invisible side zip closure',
      'Fully lined interior',
      'Subtle back walking vent'
    ],
    featuresVi: [
      'Dáng maxi suông dài tới mắt cá chân',
      'Khóa kéo ẩn bên hông tinh tế',
      'Có lớp lót bên trong đầy đủ',
      'Xẻ tà nhẹ phía sau tiện đi lại'
    ],
    howToUse: 'Dry clean recommended. Cool iron on reverse if required.',
    howToUseVi: 'Khuyến nghị giặt khô. Ủi mặt trái ở nhiệt độ thấp nếu cần.',
    ingredients: '75% Acetate, 25% Polyester. Lining: 100% Polyester.',
    ingredientsVi: '75% Acetate, 25% Polyester. Lót: 100% Polyester.',
    material: 'Cotton',
    materialVi: 'Cotton'
  },
  {
    id: 'c6',
    name: 'Single-Origin Cashmere Cropped Sweater',
    nameVi: 'Áo len Cashmere cổ giả dáng lửng',
    category: 'Lounge',
    categoryVi: 'Đồ mặc nhà & Đồ len',
    price: 298,
    rating: 4.9,
    ratingCount: 78,
    image: cashmereSweaterImg,
    description: 'A luxurious cropped sweater knit from ultra-soft single-origin Mongolian cashmere. Featuring a mock neck design and raglan sleeves for refined casual drape.',
    descriptionVi: 'Áo len dáng lửng sang trọng được dệt từ sợi cashmere Mông Cổ siêu mềm mại có nguồn gốc rõ ràng. Thiết kế cổ giả và tay áo raglan tạo độ rủ tự nhiên tinh tế.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Brown', hex: '#A07855' },
      { name: 'Beige', hex: '#E5D3C0' }
    ],
    features: [
      'Grade-A Mongolian Cashmere',
      'Subtle mock neck collar',
      'Exquisite double-ribbed hem',
      'Highly breathable thermal weight'
    ],
    featuresVi: [
      '100% Cashmere Mông Cổ cao cấp',
      'Cổ giả nhẹ nhàng tinh tế',
      'Gấu áo bo đôi tinh xảo',
      'Độ dày giữ ấm tối ưu mà vẫn thoáng khí'
    ],
    howToUse: 'Dry clean or hand wash in cold water using specialty cashmere wash. Flat dry.',
    howToUseVi: 'Giặt khô hoặc giặt tay bằng nước lạnh với nước giặt chuyên dụng cho cashmere. Trải phẳng để khô.',
    ingredients: '100% Single-Origin Cashmere.',
    ingredientsVi: '100% Cashmere nguyên bản.',
    material: 'Pima',
    materialVi: 'Len Pima'
  },
  {
    id: 'c7',
    name: 'Poplin Oversized Shirt',
    nameVi: 'Áo sơ mi Poplin phom rộng',
    category: 'Outerwear',
    categoryVi: 'Áo khoác',
    price: 168,
    rating: 4.6,
    ratingCount: 29,
    image: oversizedShirtImg,
    description: 'A structured, relaxed oversized button-down shirt woven from dense organic cotton poplin. Styled with a classic pocket detail and curved high-low tail.',
    descriptionVi: 'Áo sơ mi cúc cài phom rộng rãi được dệt từ cotton poplin hữu cơ dày dặn. Thiết kế túi ngực cổ điển và vạt bầu cao thấp.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Blue', hex: '#ADD8E6' }
    ],
    features: [
      'Crisp organic cotton poplin',
      'Oversized boyfriend cut',
      'Left breast patch pocket',
      'Mother of pearl front button closure'
    ],
    featuresVi: [
      'Vải cotton poplin hữu cơ đứng phom',
      'Kiểu dáng boyfriend rộng rãi',
      'Túi đắp trước ngực trái',
      'Cúc áo bằng vỏ ngọc trai tự nhiên'
    ],
    howToUse: 'Machine wash warm. Tumble dry low or hang dry. Steam iron for a crisp finish.',
    howToUseVi: 'Giặt máy nước ấm. Sấy khô ở chế độ thấp hoặc treo khô. Ủi hơi nước để áo phẳng phiu.',
    ingredients: '100% Organic Cotton.',
    ingredientsVi: '100% Cotton hữu cơ.',
    material: 'Cotton',
    materialVi: 'Cotton'
  },
  {
    id: 'c8',
    name: 'Cashmere Funnel Neck Sweater',
    nameVi: 'Áo len Cashmere cổ phễu',
    category: 'Lounge',
    categoryVi: 'Đồ mặc nhà & Đồ len',
    price: 278,
    rating: 4.8,
    ratingCount: 64,
    image: funnelNeckImg,
    description: 'An elegant funnel neck knitwear, made from heavy gauge premium cashmere. Cozy drop shoulders and a subtle side slit make it an ultimate winter luxury piece.',
    descriptionVi: 'Áo len cổ phễu thanh lịch làm từ sợi cashmere dày dặn cao cấp. Thiết kế vai trễ ấm áp và đường xẻ tà bên hông tinh tế tạo nên món đồ mùa đông sang trọng hàng đầu.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#E5D3C0' }
    ],
    features: [
      'Comfortable funnel neck mock collar',
      'Relaxed drop shoulders',
      'Split side vents',
      'Superb warmth-to-weight ratio'
    ],
    featuresVi: [
      'Cổ phễu ấm áp dễ chịu',
      'Thiết kế vai trễ thoải mái',
      'Xẻ tà hai bên hông',
      'Khả năng giữ ấm cực tốt và siêu nhẹ'
    ],
    howToUse: 'Hand wash cold. Lay flat on dry towel. Fold instead of hanging to preserve shape.',
    howToUseVi: 'Giặt tay bằng nước lạnh. Trải phẳng trên khăn khô. Gấp gọn thay vì treo để giữ phom dáng.',
    ingredients: '100% Cashmere.',
    ingredientsVi: '100% Cashmere.',
    material: 'Pima',
    materialVi: 'Len Pima'
  },
  {
    id: 'c9',
    name: 'Cashmere Cardigan',
    nameVi: 'Áo khoác Cardigan Cashmere',
    category: 'Lounge',
    categoryVi: 'Đồ mặc nhà & Đồ len',
    price: 248,
    rating: 4.7,
    ratingCount: 31,
    image: cashmereCardiganImg,
    description: 'A lightweight everyday V-neck cardigan spun from fine gauge sustainable cashmere. Featuring tortoiseshell buttons and fine ribbed details.',
    descriptionVi: 'Áo cardigan cổ chữ V mỏng nhẹ hàng ngày được dệt từ sợi cashmere bền vững cao cấp. Nổi bật với cúc họa tiết đồi mồi và các chi tiết bo thun dệt kim mịn.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal', hex: '#D3C2B0' }
    ],
    features: [
      'Fine gauge cashmere weave',
      'Deep V-neck cut',
      'Tortoiseshell branded buttons',
      'Semi-relaxed silhouette'
    ],
    featuresVi: [
      'Sợi cashmere dệt kim mịn nhẹ',
      'Cổ chữ V xẻ sâu',
      'Cúc họa tiết đồi mồi sang trọng',
      'Kiểu dáng suông nhẹ'
    ],
    howToUse: 'Delicate hand wash inside out. Lay flat. Dry cleanable.',
    howToUseVi: 'Giặt tay nhẹ nhàng mặt trái. Trải phẳng để khô. Có thể giặt khô.',
    ingredients: '100% Cashmere.',
    ingredientsVi: '100% Cashmere.',
    material: 'Pima',
    materialVi: 'Len Pima'
  },
  {
    id: 'c10',
    name: 'Slim Back Slit Turtleneck Tee',
    nameVi: 'Áo thun cổ lọ ôm sát xẻ lưng',
    category: 'Lounge',
    categoryVi: 'Đồ mặc nhà & Đồ len',
    price: 118,
    rating: 4.6,
    ratingCount: 19,
    image: turtleneckImg,
    description: 'A sleek, form-fitting layering turtleneck tee featuring a unique back hem slit detail. Woven from breathable lightweight cotton-modal rib.',
    descriptionVi: 'Áo thun cổ lọ ôm sát tôn dáng với chi tiết xẻ tà độc đáo sau gấu áo. Dệt từ chất liệu cotton-modal tăm mềm mại thoáng khí.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Dark Brown', hex: '#3D2B1F' }
    ],
    features: [
      'Super-soft cotton modal blend',
      'Form-fitting turtleneck design',
      'Unique back-vent slit at hem',
      'Fine rib knit construction'
    ],
    featuresVi: [
      'Vải cotton modal pha siêu mềm mại',
      'Thiết kế cổ lọ ôm sát tôn dáng',
      'Chi tiết xẻ tà độc đáo sau gấu áo',
      'Cấu trúc dệt tăm tăm nhỏ mịn'
    ],
    howToUse: 'Machine wash cold on delicate. Lay flat to dry or hang. Cool iron if needed.',
    howToUseVi: 'Giặt máy bằng nước lạnh với chế độ nhẹ nhàng. Trải phẳng hoặc treo khô. Ủi ấm nếu cần.',
    ingredients: '50% Cotton, 50% Modal.',
    ingredientsVi: '50% Cotton, 50% Modal.',
    material: 'Cotton',
    materialVi: 'Cotton'
  },
  {
    id: 'c11',
    name: 'Silk Draped Skirt',
    nameVi: 'Chân váy lụa quấn rủ',
    category: 'Skirts',
    categoryVi: 'Chân váy',
    price: 348,
    rating: 4.8,
    ratingCount: 12,
    image: drapedSkirtImg,
    description: 'A wrap-inspired draped skirt cut on the bias from heavy silk charmeuse. Boasting a beautiful asymmetrical overlap look and liquid shine drape.',
    descriptionVi: 'Chân váy xếp nếp đắp chéo lấy cảm hứng từ váy quấn, cắt xéo bias từ vải lụa satin charmeuse dày dặn. Kiểu dáng đắp chéo bất đối xứng với độ rủ óng ả.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Champagne', hex: '#F0E6D2' }
    ],
    features: [
      'Asymmetric draped wrap design',
      'Bias cut for natural shape',
      'Fixed waistband with zip closure',
      '100% luxurious heavy silk'
    ],
    featuresVi: [
      'Thiết kế quấn đắp chéo xếp nếp bất đối xứng',
      'Cắt xéo bias tạo phom dáng tự nhiên ôm nhẹ',
      'Cạp cố định với khóa kéo',
      '100% chất liệu lụa dày sang trọng'
    ],
    howToUse: 'Dry clean recommended. Cool iron reverse or dry steam with a cloth shield.',
    howToUseVi: 'Khuyến nghị giặt khô. Ủi mặt trái ở nhiệt độ thấp hoặc ủi hơi nước khô qua một lớp vải bảo vệ.',
    ingredients: '100% Mulberry Silk.',
    ingredientsVi: '100% Lụa tơ tằm Mulberry.',
    material: 'Silk',
    materialVi: 'Lụa'
  },
  {
    id: 'c12',
    name: 'Charmeuse Shorts',
    nameVi: 'Quần short lụa Charmeuse',
    category: 'Lounge',
    categoryVi: 'Đồ mặc nhà & Đồ len',
    price: 78,
    rating: 4.4,
    ratingCount: 8,
    image: shortsImg,
    description: 'Relaxed loose-cut shorts in lustrous fluid charmeuse satin. Features a comfortable elastic waist with front gather details.',
    descriptionVi: 'Quần short dáng rộng thoải mái bằng chất liệu satin charmeuse bóng mượt óng ả. Thiết kế cạp chun co giãn thoải mái với chi tiết nhún thun phía trước.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Beige', hex: '#E5D3C0' }
    ],
    features: [
      'Elastic waist with gathers',
      'Wide-leg fluid silhouette',
      'Side seam pockets',
      'Lightweight satin finish'
    ],
    featuresVi: [
      'Cạp thun co giãn nhún nhẹ phía trước',
      'Kiểu dáng ống rộng bay bổng',
      'Túi chéo bên hông tiện lợi',
      'Bề mặt vải satin mượt nhẹ'
    ],
    howToUse: 'Machine wash cold in mesh bag on gentle. Air dry flat.',
    howToUseVi: 'Giặt máy nước lạnh với túi giặt ở chế độ nhẹ nhàng. Phơi khô trên mặt phẳng.',
    ingredients: '100% Polyester Charmeuse.',
    ingredientsVi: '100% Satin Polyester.',
    material: 'Pima',
    materialVi: 'Len Pima'
  }
];
