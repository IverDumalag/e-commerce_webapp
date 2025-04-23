import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import StandImage from '../assets/stand.png';

export default function ProductCard({ products, addToCart }) {
   const styles = {
      card_container: {
         width: '18rem',
         margin: '10px',
         border: '1px solid #a0522d', 
         backgroundColor: '#f5f5dc', 
         color: '#5c4033', 
      },
      card_image: {
         height: '200px',
         objectFit: 'cover',
      },
      card_title: {
         fontSize: '1.5rem',
         fontWeight: 'bold',
         color: '#5c4033', 
      },
      card_price: {
         fontSize: '1.2rem',
         color: '#8b4513', 
      },
      stand_img: {
         width: '550px',
         height: '550px',
         backgroundSize: 'cover',
         backgroundImage: `url(${StandImage})`,
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
      },
      button_container: {
         display: 'flex',
         justifyContent: 'center',
         marginTop: '10px',
      },
      button: {
         backgroundColor: '#a0522d', 
         borderColor: '#8b4513', 
         color: '#fff', 
      },
   };
   
   return (
      <div className='stand_img' style={styles.stand_img}>
         <Card style={styles.card_container}>
            <Card.Img variant="top" src={products.product_image} style={styles.card_image} />
            <Card.Body>
               <Card.Title style={styles.card_title}>{products.product_name}</Card.Title>
               <Card.Text style={styles.card_price}>₱{products.product_price}</Card.Text>
               <div style={styles.button_container}>
                  <Button 
                     style={styles.button}
                     onClick={() => addToCart(products)}
                  >
                     Add to Cart
                  </Button>
               </div>
            </Card.Body>
         </Card>
      </div>
   );
}