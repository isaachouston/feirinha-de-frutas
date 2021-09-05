import { Button, Icon } from '@material-ui/core'
import React, { FC } from 'react'
import './ToastFullScreen.css'

export interface ToastFullScreenProps {
    message: string,
    type: 'info' | 'success' | 'warning' | 'error' | 'default' | 'dark' | 'payment',
    icon: string,
    actionButton?: string
    onClickActionButton?: () => void
}

export const ToastFullScreen: FC<ToastFullScreenProps> = ({ children, type, icon, message, actionButton, onClickActionButton }) => {


    const selectColor = (type: string) => {
        switch (type) {
            case 'info':
                return "#19d"
            case 'success':
                return "#1a5"
            case 'warning':
                return "#f90"
            case 'error':
                return "#f55"
            case 'default':
                return "#1ac"
            case 'dark':
                return "#333"
            default:
                return "#1ac"
        }
    }

    return (
        <div id="toastFullScreen" style={{ backgroundColor: selectColor(type) }}>
            <div className="container" >
                <div className="content">
                    {children ??
                        <>
                            {icon &&
                                <div className="icon">
                                    <Icon fontSize="large">{icon}</Icon>
                                </div>}
                            {message &&
                                <div className="message">
                                    {message}   
                                </div>
                            }
                            {actionButton &&
                                <Button onClick={onClickActionButton} className="actionButton">
                                    {actionButton}
                                </Button>
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
