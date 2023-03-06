import React from 'react';
// import { render, act } from '@testing-library/react';
import Gallery from './Gallery';
// import {onValue, ref, update, remove} from "firebase/database";
// import {db, refDb} from "../service/firebase-config";

// Simulez la récupération des données depuis Firebase
jest.mock('firebase', () => ({
    database: () => ({
        ref: () => ({
            onValue: (callback) => {
                const data = {
                    images: [
                        {
                            id: '1',
                            title: 'Artwork 1',
                            creationDate: '2022-01-01',
                        },
                        {
                            id: '2',
                            title: 'Artwork 2',
                            creationDate: '2022-02-01',
                        },
                        {
                            id: '3',
                            title: 'Artwork 3',
                            creationDate: '2022-03-01',
                        },
                    ],
                };
                callback({
                    val: () => data,
                });
            },
        }),
    }),
}));

describe('Gallery', () => {
    it('should fetch data from localStorage when available', async () => {
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
        };
        // Simulez les données stockées dans localStorage
        localStorageMock.getItem.mockReturnValueOnce(JSON.stringify({
            '1': {
                id: '1',
                title: 'Artwork 1',
                creationDate: '2022-01-01',
            },
            '2': {
                id: '2',
                title: 'Artwork 2',
                creationDate: '2022-02-01',
            },
            '3': {
                id: '3',
                title: 'Artwork 3',
                creationDate: '2022-03-01',
            },
        }));
        localStorageMock.getItem.mockReturnValueOnce(Date.now() - 15000);
        global.localStorage = localStorageMock;

        const { result, waitForNextUpdate } = renderHook(() => Gallery());
        await waitForNextUpdate();

        // Vérifiez que les données stockées ont été utilisées pour mettre à jour l'état
        expect(result.current.artworks.length).toBe(3);
        expect(result.current.totalArtworks).toBe(3);
        expect(result.current.connectedId).toBe('user-id');
        expect(result.current.typeFilter.length).toBe(3);
        expect(result.current.newArtworks.length).toBe(3);
        expect(result.current.isLoading).toBe(false);
    });

    it('should fetch data from Firebase when localStorage is not available or outdated', async () => {
        const localStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn(),
        };
        localStorageMock.getItem.mockReturnValue(null);
        global.localStorage = localStorageMock;

        const { result, waitForNextUpdate } = renderHook(() => Gallery());
        await waitForNextUpdate();

        // Vérifiez que les données de Firebase ont été utilisées pour mettre à jour l'état
        expect(result.current.artworks.length).toBe(3);
        expect(result.current.totalArtworks).toBe(3);
        expect(result.current.connectedId).toBe('user-id');
        expect(result.current.typeFilter.length).toBe(3);
        expect(result.current.newArtworks.length).toBe(3);
        expect(result.current.isLoading).toBe(false);
    });
});
