import './signup.scss';

import heroImage from '../../assets/heroImage.jpg';
import HeroImage from '../../components/heroImage/HeroImage';

const SignupPage = (): JSX.Element => {

    return (
        <div className="signupPage">
            <HeroImage imageUrl={heroImage} />
            <div className="signupPage-content">
                Signup Page
            </div>
        </div>
    );
}

export default SignupPage