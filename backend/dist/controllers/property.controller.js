import { prisma } from '../services/prisma';
import { ListingType } from '@prisma/client';
function asListingType(value) {
    if (value === 'SALE')
        return ListingType.SALE;
    if (value === 'RENT')
        return ListingType.RENT;
    return null;
}
function asStringArray(value) {
    if (!Array.isArray(value))
        return [];
    return value.filter((v) => typeof v === 'string');
}
export async function listProperties(req, res) {
    const ltParam = Array.isArray(req.query.listingType)
        ? req.query.listingType[0]
        : req.query.listingType;
    const listingType = ltParam ? asListingType(ltParam) : null;
    const properties = await prisma.property.findMany({
        where: listingType ? { listingType } : undefined,
        orderBy: { createdAt: 'desc' },
    });
    res.json({ ok: true, data: properties });
}
export async function getProperty(req, res) {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property)
        return res.status(404).json({ ok: false, message: 'Not found' });
    res.json({ ok: true, data: property });
}
export async function createProperty(req, res) {
    const { title, description, address, city, state, zip, price, listingType, bedrooms, bathrooms, squareFeet, imageUrls, ownerId, } = req.body ?? {};
    const lt = asListingType(listingType);
    if (typeof title !== 'string' ||
        typeof address !== 'string' ||
        typeof city !== 'string' ||
        typeof state !== 'string' ||
        typeof zip !== 'string' ||
        typeof ownerId !== 'string' ||
        typeof price !== 'number' ||
        typeof bedrooms !== 'number' ||
        typeof bathrooms !== 'number' ||
        !lt) {
        return res.status(400).json({
            ok: false,
            message: 'Invalid body. Required: title,address,city,state,zip,price,listingType,bedrooms,bathrooms,ownerId',
        });
    }
    const created = await prisma.property.create({
        data: {
            title,
            description: typeof description === 'string' ? description : null,
            address,
            city,
            state,
            zip,
            price,
            listingType: lt,
            bedrooms,
            bathrooms,
            squareFeet: typeof squareFeet === 'number' ? squareFeet : null,
            imageUrls: asStringArray(imageUrls),
            ownerId,
        },
    });
    res.status(201).json({ ok: true, data: created });
}
export async function patchProperty(req, res) {
    const id = String(req.params.id);
    const { title, description, address, city, state, zip, price, listingType, bedrooms, bathrooms, squareFeet, imageUrls, } = req.body ?? {};
    const data = {};
    if (typeof title === 'string')
        data.title = title;
    if (typeof description === 'string' || description === null)
        data.description = description;
    if (typeof address === 'string')
        data.address = address;
    if (typeof city === 'string')
        data.city = city;
    if (typeof state === 'string')
        data.state = state;
    if (typeof zip === 'string')
        data.zip = zip;
    if (typeof price === 'number')
        data.price = price;
    if (typeof bedrooms === 'number')
        data.bedrooms = bedrooms;
    if (typeof bathrooms === 'number')
        data.bathrooms = bathrooms;
    if (typeof squareFeet === 'number' || squareFeet === null)
        data.squareFeet = squareFeet;
    if (listingType !== undefined) {
        const lt = asListingType(listingType);
        if (!lt)
            return res.status(400).json({ ok: false, message: 'Invalid listingType' });
        data.listingType = lt;
    }
    if (imageUrls !== undefined)
        data.imageUrls = asStringArray(imageUrls);
    try {
        const updated = await prisma.property.update({
            where: { id },
            data,
        });
        res.json({ ok: true, data: updated });
    }
    catch {
        res.status(404).json({ ok: false, message: 'Not found' });
    }
}
export async function deleteProperty(req, res) {
    const id = String(req.params.id);
    try {
        await prisma.property.delete({ where: { id } });
        res.json({ ok: true });
    }
    catch {
        res.status(404).json({ ok: false, message: 'Not found' });
    }
}
