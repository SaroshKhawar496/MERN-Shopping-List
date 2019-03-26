import React, {Component} from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button
} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';


class ShoppingList extends Component {

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }
    
    componentDidMount(){
        // calling the action for redux
        this.props.getItems();
    }
    onDeleteClick = (id) => {
        // calling the action for redux
        this.props.deleteItem(id);
    }

    render() { 
        // item represents the whole state, items is the array we want     
        const {items} = this.props.item;

        return ( 
            <Container>
                
                <ListGroup>

                    <TransitionGroup className="shopping-list">
                        {/* using _id, becoz items coming from mongodb */}
                        {items.map( ({_id, name}) => (
                            
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ?
                                        <Button 
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}                                    
                                        >
                                        {/* cross button  */}
                                            &times; 
                                        </Button>
                                        : null }
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


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})
 
export default connect(mapStateToProps, {getItems,deleteItem })(ShoppingList);