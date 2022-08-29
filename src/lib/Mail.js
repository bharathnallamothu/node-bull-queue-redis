import nodemailer from 'nodemailer';
import mailConfig from '../config/mail';

var transport = nodemailer.createTransport(mailConfig);

export default transport;