import dotenv from 'dotenv/config';
import * as cli from './cli';

dotenv;

export function index() {
    return new cli.CLI()
}
index()