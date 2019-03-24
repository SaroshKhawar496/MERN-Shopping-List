// this is a container (component linked to redux)
import React , {component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';

class ItemModal extends Component {

}
export default connect()(ItemModal);