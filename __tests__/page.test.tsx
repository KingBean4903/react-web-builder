/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Home from '../app/page';

describe('Page', () => {

	it('renders  a heading', () => {

			render(<Home />);

			fireEvent.click(screen.getByTestId('add-elmnt-btn'));	
			expect(screen.getByText('Elements Modal')).toBeInTheDocument()

			const logoImg = screen.getByAltText(/Logo/i)
			expect(logoImg).toBeInTheDocument();

			expect(screen.getByText(/Lifestyle/)).toBeInTheDocument();
			
	})

})


