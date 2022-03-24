import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import './ToastMessage.scss';

import { IApplicationState } from '../../models/interfaces/store/states/application';
import * as toastMessageActions from '../../store/actions/toastMessage';

interface IToastMessage {
    classname?: string;
}

const ToastMessage = (props: IToastMessage) => {
    const { classname = '' } = props;
    const { clearToastMessage } = toastMessageActions;

    const dispatch = useDispatch();
    const toastMessageState = useSelector((state: IApplicationState) => state.toastMessage);
    
    const visibility = toastMessageState.visibility;
    const toastMessageContent = {
        type: toastMessageState.messageType,
        message: toastMessageState.message
    }

    useEffect(() => {

        if (visibility) {
            const timer = setTimeout(() => {
                
                dispatch(clearToastMessage());
            }, 3000);

            return () => {
                 
                clearTimeout(timer);
            }
        }

    }, [toastMessageState, visibility, clearToastMessage, dispatch]);

    return (
        <div className={`
            toastMessage 
            ${toastMessageContent.type === 'warning' ? 'warning' : ''}
            ${toastMessageContent.type === 'success' ? 'success' : ''}
            ${classname ? `toastMessage-${classname}` : '' }
        `}>
            { 
                visibility &&
                <>
                    <div className="toastMessage-text">
                        {toastMessageContent.message}
                    </div>
                    <div 
                        className="toastMessage-closeIcon"
                        onClick={() => dispatch(clearToastMessage())}
                    >
                        X
                    </div>
                </>  
            }
        </div>
    );
}

export default ToastMessage;