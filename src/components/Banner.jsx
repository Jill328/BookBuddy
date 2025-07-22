import './Banner.css';
import PropTypes from 'prop-types';

function Banner({ title, subtitle}) {
    return (
        <div className="page-bannner">
         <div className="banner-content">
            <h1>{title}</h1>
            {subtitle &&
            <p>{subtitle}</p>}
         </div>
        </div>    
    )
}

Banner.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
};

export default Banner;
