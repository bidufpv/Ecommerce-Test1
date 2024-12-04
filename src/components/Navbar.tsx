import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Store, UserCircle, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useAuthStore } from '../store/useAuthStore';

export function Navbar() {
  const cart = useStore((state) => state.cart);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">TechMart</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated() ? (
              <>
                {user?.role === 'seller' && (
                  <Link to="/seller" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                    <UserCircle className="h-5 w-5" />
                    <span>Seller Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <UserCircle className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
            <Link to="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}