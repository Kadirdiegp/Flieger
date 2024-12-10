import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-neutral-900">404</h1>
        <p className="mt-4 text-xl text-neutral-600">Seite nicht gefunden</p>
        <Button asChild className="mt-8">
          <Link to="/" className="inline-flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Zurück zur Startseite
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;