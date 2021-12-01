import { useEffect, useState } from "react"

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scorlled upto given distance
    const toggleVisibility = () => {
        if (window.pageYOffset > 800) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="scroll-to-top">
            {isVisible &&
            <button className="reset-button cursor-pointer" onClick={scrollToTop}>
                <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="64" height="64" rx="4" fill="#0AAD3B"/>
                    <path d="M46.5599 40.0315C46.3456 40.2627 46.0879 40.4493 45.8014 40.5809C45.515 40.7124 45.2054 40.7862 44.8904 40.7981C44.5755 40.81 44.2612 40.7597 43.9657 40.6501C43.6701 40.5406 43.3991 40.3739 43.168 40.1595L31.2002 28.8733L19.2323 40.1595C19.0012 40.3738 18.7302 40.5405 18.4346 40.6501C18.1391 40.7596 17.8248 40.8099 17.5099 40.798C17.1949 40.7861 16.8853 40.7123 16.5989 40.5808C16.3125 40.4493 16.0547 40.2626 15.8404 40.0315C15.6261 39.8004 15.4594 39.5293 15.3498 39.2338C15.2403 38.9382 15.19 38.624 15.2019 38.309C15.2138 37.9941 15.2876 37.6845 15.4191 37.3981C15.5506 37.1116 15.7373 36.8539 15.9684 36.6396L29.5682 23.8398C30.012 23.4282 30.5949 23.1995 31.2002 23.1995C31.8054 23.1995 32.3883 23.4282 32.8321 23.8398L46.4319 36.6396C46.6631 36.8539 46.8497 37.1116 46.9813 37.3981C47.1128 37.6845 47.1866 37.9941 47.1985 38.309C47.2104 38.624 47.1601 38.9382 47.0505 39.2338C46.941 39.5293 46.7742 39.8004 46.5599 40.0315Z" fill="white"/>
                </svg>
            </button>}
        </div>
    );
}
