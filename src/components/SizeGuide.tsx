import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Ruler } from 'lucide-react';

interface SizeGuideProps {
  productType: 'hoodies' | 'tshirts' | 'pants';
}

export const SizeGuide: React.FC<SizeGuideProps> = ({ productType }) => {
  const sizeCharts = {
    hoodies: {
      headers: ['Größe', 'Brustumfang', 'Länge', 'Schulterbreite'],
      sizes: [
        ['XS', '96-101 cm', '66 cm', '42 cm'],
        ['S', '101-106 cm', '68 cm', '44 cm'],
        ['M', '106-111 cm', '70 cm', '46 cm'],
        ['L', '111-116 cm', '72 cm', '48 cm'],
        ['XL', '116-121 cm', '74 cm', '50 cm'],
        ['XXL', '121-126 cm', '76 cm', '52 cm'],
      ],
    },
    tshirts: {
      headers: ['Größe', 'Brustumfang', 'Länge', 'Schulterbreite'],
      sizes: [
        ['XS', '86-91 cm', '64 cm', '40 cm'],
        ['S', '91-96 cm', '66 cm', '42 cm'],
        ['M', '96-101 cm', '68 cm', '44 cm'],
        ['L', '101-106 cm', '70 cm', '46 cm'],
        ['XL', '106-111 cm', '72 cm', '48 cm'],
        ['XXL', '111-116 cm', '74 cm', '50 cm'],
      ],
    },
    pants: {
      headers: ['Größe', 'Taille', 'Hüfte', 'Beinlänge'],
      sizes: [
        ['XS', '71-76 cm', '86-91 cm', '76 cm'],
        ['S', '76-81 cm', '91-96 cm', '77 cm'],
        ['M', '81-86 cm', '96-101 cm', '78 cm'],
        ['L', '86-91 cm', '101-106 cm', '79 cm'],
        ['XL', '91-96 cm', '106-111 cm', '80 cm'],
        ['XXL', '96-101 cm', '111-116 cm', '81 cm'],
      ],
    },
  };

  const chart = sizeCharts[productType];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Ruler className="h-4 w-4" />
          Größentabelle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Größentabelle</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {chart.headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {chart.sizes.map((size) => (
                <TableRow key={size[0]}>
                  {size.map((value, index) => (
                    <TableCell key={index}>{value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 space-y-4 text-sm text-neutral-400">
            <p>
              <strong>Wie messe ich richtig?</strong>
            </p>
            <ul className="list-disc pl-4 space-y-2">
              <li>
                <strong>Brustumfang:</strong> Miss horizontal um die breiteste
                Stelle deiner Brust.
              </li>
              <li>
                <strong>Länge:</strong> Miss von der höchsten Schulternaht bis zum
                unteren Saum.
              </li>
              <li>
                <strong>Schulterbreite:</strong> Miss von Schulternaht zu
                Schulternaht.
              </li>
            </ul>
            <p className="text-xs">
              Alle Maße sind Richtwerte und können leicht variieren. Bei Fragen
              kontaktiere unseren Support.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
