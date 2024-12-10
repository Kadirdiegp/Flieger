import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { CheckoutLayout } from '../../components/checkout/CheckoutLayout';
import { useNavigate } from 'react-router-dom';

const shippingSchema = z.object({
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  lastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  street: z.string().min(5, 'Straße muss mindestens 5 Zeichen lang sein'),
  city: z.string().min(2, 'Stadt muss mindestens 2 Zeichen lang sein'),
  postalCode: z.string().regex(/^\d{5}$/, 'Ungültige Postleitzahl'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  phone: z.string().regex(/^\+?[0-9\s-]{10,}$/, 'Ungültige Telefonnummer'),
});

const Shipping = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(shippingSchema),
  });

  const onSubmit = (data: any) => {
    // Save shipping data and proceed to payment
    navigate('/checkout/payment');
  };

  return (
    <CheckoutLayout step={2}>
      <div className="bg-neutral-900 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Lieferadresse</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                placeholder="Vorname"
                {...register('firstName')}
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName.message as string}</p>
              )}
            </div>
            
            <div>
              <Input
                placeholder="Nachname"
                {...register('lastName')}
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName.message as string}</p>
              )}
            </div>
          </div>

          <div>
            <Input
              placeholder="Straße und Hausnummer"
              {...register('street')}
              className="bg-neutral-800 border-neutral-700 text-white"
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-500">{errors.street.message as string}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                placeholder="Stadt"
                {...register('city')}
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city.message as string}</p>
              )}
            </div>
            
            <div>
              <Input
                placeholder="PLZ"
                {...register('postalCode')}
                className="bg-neutral-800 border-neutral-700 text-white"
              />
              {errors.postalCode && (
                <p className="mt-1 text-sm text-red-500">{errors.postalCode.message as string}</p>
              )}
            </div>
          </div>

          <div>
            <Input
              type="email"
              placeholder="E-Mail"
              {...register('email')}
              className="bg-neutral-800 border-neutral-700 text-white"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message as string}</p>
            )}
          </div>

          <div>
            <Input
              type="tel"
              placeholder="Telefon"
              {...register('phone')}
              className="bg-neutral-800 border-neutral-700 text-white"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone.message as string}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/cart')}
            >
              Zurück
            </Button>
            <Button type="submit">
              Weiter zur Zahlung
            </Button>
          </div>
        </form>
      </div>
    </CheckoutLayout>
  );
};

export default Shipping;