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
			expect(screen.getByText('Topbar')).toBeInTheDocument()
			expect(screen.getByRole('sidenav')).toBeInTheDocument()
			// expect(screen.getByText('Content')).toBeInTheDocument()
	
			expect(screen.getByText('Elements')).toBeInTheDocument()
			expect(screen.getByRole('banner')).toBeInTheDocument()

			fireEvent.click(screen.getByText(/Section/i));

			const sections = screen.queryAllByRole('section');
			expect(sections.length).toBe(2);
			
	})

})


