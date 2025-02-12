 import React from 'react'
function Footer() {
    return (
        <footer className="fixed inset-x-0 bottom-0 bg-blue-700 text-white flex items-center justify-between px-6 shadow-md z-50">
            <div className="text-lg font-semibold">
                Contact Us: 
                <span className="ml-2">
                    <a href="mailto:datainsights@gmail.com" className="hover:underline">
                        datainsights@gmail.com
                    </a> | 
                    <a href="tel:+91 8799565899" className="ml-2 hover:underline">
                        +91 8799565899
                    </a>
                </span>
            </div>
            <div className="flex items-center space-x-4">
                <a href="#" className="text-white hover:text-gray-300 text-sm">
                    Privacy Policy
                </a>
                <a href="#" className="text-white hover:text-gray-300 text-sm">
                    Terms of Service
                </a>
                <p className="text-sm">
                    © 2024. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}


export default Footer