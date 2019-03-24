import React, {Component} from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import uuid from 'uuid';

import {connect} from 'react-redux';
import {getItems} from '../actions/itemActions';
import PropTypes from 'prop-types';


class ShoppingList extends Component {
    
    componentDidMount(){
        this.props.getItems();
    }

    render() { 
        // item represents the whole state, items is the array we want     
        const {items} = this.props.item;

        return ( 
            <Container>
                <Button
                 color="dark"
                 style={{marginBottom: '2rem'}}
                 onClick={()=>{
                     const itemName = prompt("Enter Item");
                    //  add new item to the current state
                     if(itemName){
                         this.setState(state => ({
                             items: [...state.items, {id: uuid(), name: itemName}]
                         }))
                     }
                 }}
                >
                    Add Item</Button>
                
                <ListGroup>

                    <TransitionGroup className="shopping-list">

                        {items.map( ({id, name}) => (
                            
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button 
                                     className="remove-btn"
                                     color="danger"
                                     size="sm"
                                     onClick={() => {
                                        this.setState(state =>({
                                            // deleting the item for which delete btn is pressed
                                            items: state.items.filter(item => item.id !== id)
                                        }));
                                     }}                                    
                                    >
                                    {/* cross button  */}
                                       &times; 
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                            
                        ))}

                    </TransitionGroup>
                </ListGroup>
            </Container>
         );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})
 
export default connect(mapStateToProps, {getItems })(ShoppingList);