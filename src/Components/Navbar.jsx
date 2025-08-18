import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Layout, Menu, Dropdown, Avatar, Button, Badge, Drawer } from 'antd';
import {
    LogoutOutlined,
    UserOutlined,
    PlusOutlined,
    UnorderedListOutlined,
    CheckCircleOutlined,
    HomeOutlined,
    SearchOutlined,
    UserAddOutlined,
    LoginOutlined,
    MenuOutlined,
    InfoCircleOutlined,
    ContactsOutlined,
    ReadOutlined
} from '@ant-design/icons';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import { toast } from 'react-toastify';
import ThemeContext from '../Contexts/ThemeContext.jsx';

const { Header } = Layout;

const Navbar = () => {
    const { signOutUser, saveUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const clickSignOut = () => {
        signOutUser()
            .then(() => {
                navigate('/login');
                toast.success('Logged out successfully!', { autoClose: 2000 });
                setMobileMenuVisible(false);
            })
            .catch((error) => {
                console.error('Sign out error:', error);
                toast.error('Logout failed!', { autoClose: 2000 });
            });
    };

    const handleMobileNavClick = () => {
        setMobileMenuVisible(false);
    };

    const isMobile = windowWidth < 768;

    const navLinks = [
        {
            key: 'home',
            label: (
                <NavLink
                    to="/"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <HomeOutlined />
                    Home
                </NavLink>
            ),
        },
        saveUser && {
            key: 'items',
            label: (
                <NavLink
                    to="/allItems"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <SearchOutlined />
                    Lost & Found Items
                </NavLink>
            ),
        },
        {
            key: 'about',
            label: (
                <NavLink
                    to="/about"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <InfoCircleOutlined />
                    About
                </NavLink>
            ),
        },
        {
            key: 'contact',
            label: (
                <NavLink
                    to="/contact"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <ContactsOutlined />
                    Contact
                </NavLink>
            ),
        },
        {
            key: 'blogs',
            label: (
                <NavLink
                    to="/blogs"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <ReadOutlined />
                    Blogs
                </NavLink>
            ),
        },
        !saveUser && {
            key: 'register',
            label: (
                <NavLink
                    to="/register"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <UserAddOutlined />
                    Register
                </NavLink>
            ),
        },
        !saveUser && {
            key: 'login',
            label: (
                <NavLink
                    to="/login"
                    onClick={handleMobileNavClick}
                    style={({ isActive }) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        color: isActive ? '#ffffff' : '#d9d9d9',
                        backgroundColor: isActive ? '#333333' : 'transparent',
                        textDecoration: 'none',
                        fontWeight: isActive ? '600' : '500',
                    })}
                >
                    <LoginOutlined />
                    Login
                </NavLink>
            ),
        },
    ].filter(Boolean);

    const userMenu = (
        <Menu
            style={{
                minWidth: '220px',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid #f0f0f0',
            }}
            items={[
                {
                    key: 'name',
                    label: (
                        <div style={{
                            padding: '12px 8px 8px 8px',
                            borderBottom: '1px solid #f0f0f0',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                fontWeight: '600',
                                fontSize: '16px',
                                color: '#262626',
                                marginBottom: '4px'
                            }}>
                                {saveUser?.displayName || 'User'}
                            </div>
                            <div style={{
                                fontSize: '12px',
                                color: '#8c8c8c'
                            }}>
                                {saveUser?.email}
                            </div>
                        </div>
                    ),
                    disabled: true,
                },
                {
                    key: 'addItems',
                    label: (
                        <Link
                            to="/addItems"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px 4px',
                                color: '#595959',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            <PlusOutlined style={{ color: '#52c41a' }} />
                            Add Item
                        </Link>
                    ),
                },
                {
                    key: 'myItems',
                    label: (
                        <Link
                            to="/myItems"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px 4px',
                                color: '#595959',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            <UnorderedListOutlined style={{ color: '#1677ff' }} />
                            My Items
                        </Link>
                    ),
                },
                {
                    key: 'recovered',
                    label: (
                        <Link
                            to="/allRecovered"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '8px 4px',
                                color: '#595959',
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                            }}
                        >
                            <CheckCircleOutlined style={{ color: '#faad14' }} />
                            Recovered Items
                        </Link>
                    ),
                },
                {
                    type: 'divider',
                },
                {
                    key: 'logout',
                    label: (
                        <Button
                            type="text"
                            danger
                            icon={<LogoutOutlined />}
                            onClick={clickSignOut}
                            style={{
                                width: '100%',
                                textAlign: 'left',
                                border: 'none',
                                boxShadow: 'none',
                                padding: '8px 4px',
                                height: 'auto',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            Logout
                        </Button>
                    ),
                },
            ]}
        />
    );

    // Mobile menu items
    const mobileMenuItems = [
        {
            key: 'mobile-home',
            label: (
                <Link 
                    to="/" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <HomeOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    Home
                </Link>
            ),
        },
        saveUser && {
            key: 'mobile-items',
            label: (
                <Link 
                    to="/allItems" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <SearchOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    Lost & Found Items
                </Link>
            ),
        },
        {
            key: 'mobile-about',
            label: (
                <Link 
                    to="/about" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <InfoCircleOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    About
                </Link>
            ),
        },
        {
            key: 'mobile-contact',
            label: (
                <Link 
                    to="/contact" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <ContactsOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    Contact
                </Link>
            ),
        },
        {
            key: 'mobile-blogs',
            label: (
                <Link 
                    to="/blogs" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <ReadOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    Blogs
                </Link>
            ),
        },
        !saveUser && {
            key: 'mobile-register',
            label: (
                <Link 
                    to="/register" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <UserAddOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    Register
                </Link>
            ),
        },
        !saveUser && {
            key: 'mobile-login',
            label: (
                <Link 
                    to="/login" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <LoginOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    Login
                </Link>
            ),
        },
        saveUser && {
            key: 'mobile-divider-1',
            type: 'divider',
        },
        saveUser && {
            key: 'mobile-add',
            label: (
                <Link 
                    to="/addItems" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <PlusOutlined style={{ color: '#52c41a', fontSize: '18px' }} />
                    Add Item
                </Link>
            ),
        },
        saveUser && {
            key: 'mobile-my-items',
            label: (
                <Link 
                    to="/myItems" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <UnorderedListOutlined style={{ color: '#1677ff', fontSize: '18px' }} />
                    My Items
                </Link>
            ),
        },
        saveUser && {
            key: 'mobile-recovered',
            label: (
                <Link 
                    to="/allRecovered" 
                    onClick={handleMobileNavClick}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#262626',
                        textDecoration: 'none',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <CheckCircleOutlined style={{ color: '#faad14', fontSize: '18px' }} />
                    Recovered Items
                </Link>
            ),
        },
        saveUser && {
            key: 'mobile-divider-2',
            type: 'divider',
        },
        saveUser && {
            key: 'mobile-logout',
            label: (
                <div
                    onClick={clickSignOut}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: '#ff4d4f',
                        cursor: 'pointer',
                        padding: '12px 0',
                        fontSize: '16px',
                        fontWeight: '500',
                        transition: 'color 0.3s ease',
                    }}
                >
                    <LogoutOutlined style={{ fontSize: '18px' }} />
                    Logout
                </div>
            ),
        },
    ].filter(Boolean);

    return (
        <>
            <Header
                style={{
                    backgroundColor: '#2f3349',
                    boxShadow: '0 2px 16px rgba(0, 0, 0, 0.08)',
                    padding: '0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '72px',
                    borderBottom: '1px solid #404040',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                }}
            >
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
                {/* Logo */}
                <div>
                    <Link
                        to="/"
                        style={{
                            fontSize: isMobile ? '24px' : '28px',
                            fontWeight: '700',
                            background: 'linear-gradient(135deg, #1677ff 0%, #69b1ff 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            textDecoration: 'none',
                            letterSpacing: '-0.5px',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        FindMyStuff
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                {!isMobile && (
                    <Menu
                        mode="horizontal"
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            background: 'transparent',
                            borderBottom: 'none',
                            fontSize: '15px',
                            fontWeight: '500',
                            color: '#d9d9d9',
                        }}
                        items={navLinks}
                        selectable={false}
                    />
                )}

                {/* Right Side (Theme + Avatar + Mobile Menu) */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px'
                }}>
                    <div style={{
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'background-color 0.3s ease',
                    }}>
                        <ThemeContext />
                    </div>

                    {/* Desktop Avatar */}
                    {saveUser && !isMobile && (
                        <Dropdown
                            overlay={userMenu}
                            trigger={['click']}
                            placement="bottomRight"
                            arrow={{ pointAtCenter: true }}
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                style={{
                                    cursor: 'pointer',
                                    padding: 0,
                                    transition: 'transform 0.2s ease',
                                }}
                            >
                                <Badge dot color="#52c41a" offset={[-8, 8]}>
                                    <Avatar
                                        src={saveUser?.photoURL}
                                        icon={<UserOutlined />}
                                        size={44}
                                        style={{
                                            border: '3px solid #ffffff',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                        }}
                                    />
                                </Badge>
                            </div>
                        </Dropdown>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setMobileMenuVisible(true)}
                            style={{
                                color: '#d9d9d9',
                                fontSize: '18px',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        />
                    )}
                </div>
                </div>
            </Header>

            {/* Mobile Drawer Menu */}
            <Drawer
                title={
                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px',
                        padding: '8px 0'
                    }}>
                        {saveUser && (
                            <Avatar
                                src={saveUser?.photoURL}
                                icon={<UserOutlined />}
                                size={40}
                            />
                        )}
                        <div>
                            <div style={{ fontWeight: '600', fontSize: '16px' }}>
                                {saveUser ? (saveUser?.displayName || 'User') : 'FindMyStuff'}
                            </div>
                            {saveUser && (
                                <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                                    {saveUser?.email}
                                </div>
                            )}
                        </div>
                    </div>
                }
                placement="right"
                onClose={() => setMobileMenuVisible(false)}
                open={mobileMenuVisible}
                width={280}
                style={{
                    zIndex: 1001,
                }}
                bodyStyle={{
                    padding: '16px 0',
                }}
            >
                <Menu
                    mode="vertical"
                    style={{
                        border: 'none',
                        background: 'transparent',
                    }}
                    items={mobileMenuItems}
                />
            </Drawer>
        </>
    );
};

export default Navbar;