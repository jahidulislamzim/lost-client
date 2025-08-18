import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const ThemeContext = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setIsAnimating(true);
        setTimeout(() => {
            setTheme(prev => (prev === "light" ? "dark" : "light"));
            setIsAnimating(false);
        }, 150);
    };

    return (
        <Tooltip 
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            placement="bottom"
        >
            <Button
                type="text"
                shape="circle"
                size="large"
                onClick={toggleTheme}
                icon={
                    <div 
                        style={{
                            transform: isAnimating ? 'rotate(180deg) scale(0.8)' : 'rotate(0deg) scale(1)',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            opacity: isAnimating ? 0.6 : 1,
                        }}
                    >
                        {theme === "light" ? <MoonOutlined /> : <SunOutlined />}
                    </div>
                }
                style={{
                    color: '#d9d9d9',
                    border: '1px solid rgba(217, 217, 217, 0.2)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    width: '40px',
                    height: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(217, 217, 217, 0.5)';
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(217, 217, 217, 0.2)';
                    e.currentTarget.style.transform = 'scale(1) translateY(0px)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
                onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95) translateY(0px)';
                }}
                onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)';
                }}
            />
        </Tooltip>
    );
};

export default ThemeContext;