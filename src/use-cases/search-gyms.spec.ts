import {expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })


  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.5732992,
      longitude: -46.6321408,
    })

    await gymsRepository.create({
      title: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.5732992,
      longitude: -46.6321408,
    })
    
    const {gyms} = await sut.execute({
      query: 'JavaScript',
      page: 1,
    })
    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym'}),
    ])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++){
      await gymsRepository.create({
        title: `TypeScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.5732992,
        longitude: -46.6321408,
      })
    }

    const {gyms} = await sut.execute({
      query: 'TypeScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({title: 'TypeScript Gym 21'}),
      expect.objectContaining({title: 'TypeScript Gym 22'}),
    ])
  })
})