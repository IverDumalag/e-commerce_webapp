import AppleImage from '../assets/apple.png';
import BitterGourdImage from '../assets/bitter_gourd.png';
import BroccoliImage from '../assets/broccoli.jpg';
import GrapesImage from '../assets/grapes.jpg';
import LuyaImage from '../assets/luya.jpg';
import MangoImage from '../assets/mango.png';
import MangosteenImage from '../assets/mangosteen.png';
import OrangeImage from '../assets/orange.jpg';
import PapayaImage from '../assets/papaya.png';
import PearImage from '../assets/pear.png';
import ShiitakeMushroomImage from '../assets/shiitake_mushroom.png';
import WatermelonImage from '../assets/watermelon.jpg';

const products = [
  { 
    product_id: 1, 
    product_name: 'Apple', 
    category_id: 1, 
    description: 'Fresh and juicy apples.', 
    user_id: 1, 
    product_image: AppleImage, 
    product_price: 50.00,
    quantity: 10,
  },
  { 
    product_id: 2, 
    product_name: 'Bitter Gourd', 
    category_id: 2, 
    description: 'Healthy and fresh bitter gourd.', 
    user_id: 1, 
    product_image: BitterGourdImage, 
    product_price: 80.00,
    quantity: 10,
  },
  { 
    product_id: 3, 
    product_name: 'Broccoli', 
    category_id: 2, 
    description: 'Fresh green broccoli.', 
    user_id: 1, 
    product_image: BroccoliImage, 
    product_price: 120.00,
    quantity: 10,
  },
  { 
    product_id: 4, 
    product_name: 'Grapes', 
    category_id: 1, 
    description: 'Sweet and fresh grapes.', 
    user_id: 1, 
    product_image: GrapesImage, 
    product_price: 150.00,
    quantity: 10,
  },
  { 
    product_id: 5, 
    product_name: 'Luya', 
    category_id: 3, 
    description: 'Fresh ginger for cooking.', 
    user_id: 1, 
    product_image: LuyaImage, 
    product_price: 40.00,
    quantity: 10, 
  },
  { 
    product_id: 6, 
    product_name: 'Mango', 
    category_id: 1, 
    description: 'Sweet and ripe mangoes.', 
    user_id: 1, 
    product_image: MangoImage, 
    product_price: 100.00,
    quantity: 10, 
  },
  { 
    product_id: 7, 
    product_name: 'Mangosteen', 
    category_id: 1, 
    description: 'Exotic and fresh mangosteen.', 
    user_id: 1, 
    product_image: MangosteenImage, 
    product_price: 200.00,
    quantity: 10, 
  },
  { 
    product_id: 8, 
    product_name: 'Orange', 
    category_id: 1, 
    description: 'Citrusy and fresh oranges.', 
    user_id: 1, 
    product_image: OrangeImage, 
    product_price: 60.00,
    quantity: 10,
  },
  { 
    product_id: 9, 
    product_name: 'Papaya', 
    category_id: 1, 
    description: 'Fresh and ripe papayas.', 
    user_id: 1, 
    product_image: PapayaImage, 
    product_price: 70.00,
    quantity: 10, 
  },
  { 
    product_id: 10, 
    product_name: 'Pear', 
    category_id: 1, 
    description: 'Sweet and juicy pears.', 
    user_id: 1, 
    product_image: PearImage, 
    product_price: 90.00,
    quantity: 10, 
  },
  { 
    product_id: 11, 
    product_name: 'Shiitake Mushroom', 
    category_id: 2, 
    description: 'Fresh and healthy shiitake mushrooms.', 
    user_id: 1, 
    product_image: ShiitakeMushroomImage, 
    product_price: 250.00,
    quantity: 10, 
  },
  { 
    product_id: 12, 
    product_name: 'Watermelon', 
    category_id: 1, 
    description: 'Juicy and fresh watermelon.', 
    user_id: 1, 
    product_image: WatermelonImage, 
    product_price: 180.00,
    quantity: 10, 
  },
];

export default products;