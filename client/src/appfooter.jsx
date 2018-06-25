import React from 'react';

class AppFooter extends React.Component {
    render() {
        var footerStyle = {
            paddingTop: 5,
            paddingBottom:5
        }
        
        return (
            <div className='fixed-bottom'>
                <div className='card-footer text-muted ' style={footerStyle}>
                    <div className='row'>
                        <div className="col-md-6"></div>
                        <div className='col-md-6 text-right'>
                            &copy; Tangoe India
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default AppFooter;