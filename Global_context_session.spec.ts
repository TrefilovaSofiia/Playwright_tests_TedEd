import { test, expect, chromium } from '@playwright/test';

let browser;
let context;
let page;

test.describe('Tests of Global context session', () => {

  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Sign In
    await page.goto('https://ed.ted.com/lessons?direction=desc&sort=featured-position');
    await page.getByRole('button', { name: 'Confirm My Choices' }).click();
    await page.getByRole('link', { name: 'How did ancient civilizations' }).click();
    await page.getByRole('link', { name: 'Customize this lesson' }).click();
    await page.getByRole('button', { name: 'Confirm My Choices' }).click();
    await page.getByTestId('lookup__username__1').click();
    await page.getByTestId('lookup__username__1').fill('criobubble@gmail.com');
    await page.getByTestId('lookup__continue__3').click();
    await page.getByTestId('credentials__password__2').click();
    await page.getByTestId('credentials__password__2').fill('Test123!');
    await page.getByTestId('credentials__continue__3').click();
    await page.getByRole('link', { name: 'Customize this lesson' }).click();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  // Lesson Title + Let's Begin
  test('Function1: Edit lesson and save changes', async () => {
    await page.getByRole('link', { name: 'How did ancient civilizations' }).click();
    await page.locator('#lesson_name').fill('TestingtesttestingtestTestingtesttestingtestTestingtesttestingtestTestingtesttestingtestTestingtestt');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('link', { name: 'Ice cream has a unique role' }).click();
    await page.locator('#some-form').getByRole('paragraph').click();
    await page.locator('.ql-editor').fill('Ice cream has a unique role in our world’s history, culture, and cravings. The first accounts of cold desserts date back to the first century, in civilizations including ancient Rome, Mughal India, and Tang Dynasty China.Yet the cream-based delicacy we know today made a much later debut. So, how did the delicious sweet treat come to be?Vivian Jiang shares the scoop on the history of ice cream.Test');
    await page.locator('.ql-editor').press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold' }).click();
    await page.getByRole('button', { name: 'Underline' }).click();
    await page.getByRole('button', { name: 'Italic' }).click();
    await page.getByRole('button', { name: 'Link' }).click();
    await page.locator('#some-form a').nth(1).click();
    await page.getByRole('button', { name: 'Subscript' }).click();
    await page.getByRole('button', { name: 'Superscript' }).click();
    await page.getByRole('button', { name: 'Preview' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
  });

  // Think : Exclude + Include questions
  test('Function2: Exclude and include questions', async () => {
    const ExcludeCount = 7
    for (let i=0; i<ExcludeCount; i++){
      await page.getByRole('button', { name: 'Exclude this question' }).nth(i - 7).click();
    }
    const IncludeCount = 7
    for (let b=0; b<IncludeCount; b++){
      await page.getByRole('button', { name: 'Include this question' }).nth(b - 7).click();
    }
    await page.reload().then(() => page.reload());
  });

  // Think : Edit question
  test('Function3: Edit question', async () => {
    const questionCount = 10;
    for (let i = 1; i < questionCount; i += 2){
      const questionLocator = page.locator('div.truncate');
      await questionLocator.nth(i).click();
      await page.locator('#question_title').fill('test question text');
      const answers = page.locator('.nested-form-wrapper.mb-4 .ql-editor');
      const answerCount = 4;
      for (let j = 0; j < answerCount; j++) {
        await answers.nth(j).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor nibh vitae ante ullamcorper, ac consequat lorem convallis. Cras vel nibh a libero malesuada bibendum. Donec ullamcorper nulla non enim malesuada, at vulputate orci c.');
      }
      const answers2 = page.getByRole('button', { name: 'Delete this answer' });
      const answers2Count = 4;
      for (let n = 0; n < answers2Count; n ++) {
        await answers2.nth(0).click();
      }
      const answers3 = page.getByRole('button', { name: 'Add another answer' });
      const answers3Count = 4;
      for (let k = 0; k < answers3Count; k++) {
        await answers3.nth(0).click();
      }
      const answers4 = page.locator('.nested-form-wrapper.mb-4 .ql-editor');
      const answers4Count = 8;
      for (let d = 4; d < answers4Count; d ++) {
        await answers4.nth(d).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor nibh vitae ante ullamcorper, ac consequat lorem convallis. Cras vel nibh a libero malesuada bibendum. Donec ullamcorper nulla non enim malesuada, at vulputate orci c.');
        await answers4.nth(d).press('ControlOrMeta+a');
        await page.getByRole('button', { name: 'Bold' }).nth(d - 4).click();
        await page.getByRole('button', { name: 'Underline' }).nth(d - 4).click();
        await page.getByRole('button', { name: 'Italic' }).nth(d - 4).click();
        await page.getByRole('button', { name: 'Subscript' }).nth(d - 4).click();
        await page.getByRole('button', { name: 'Superscript' }).nth(d - 4).click();
      }
      await page.getByRole('checkbox', { name: 'a' }).check();
      await page.getByLabel('b', { exact: true }).check();
      await page.getByLabel('c', { exact: true }).check();
      await page.getByLabel('d', { exact: true }).check();
      await page.getByRole('slider').fill('241');
      await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').first().click();
      await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').nth(1).dblclick();
      await page.getByRole('slider').fill('0');
      await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').nth(1).click();
      await page.getByRole('slider').fill('295');
      await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').first().click();
      await page.getByRole('button', { name: 'Save' }).click();
    }
    const question2Count = 16;
    for (let p = 12; p < question2Count; p += 2){
      const questionLocator = page.locator('div.truncate');
      await questionLocator.nth(p).click();
      await page.locator('#question_title').fill('test question text');
      await page.getByRole('button', { name: 'Save' }).click();
    }
  }
  );

  // Think : Multiple Choice question/Function 4
  test('Function4: Multiple Choice question', async () => {
    await page.getByRole('link', { name: 'Multiple Choice Question' }).click();
    await page.locator('#question_title').fill('Multiple question text');
    const answers = page.locator('.nested-form-wrapper.mb-4 .ql-editor');
      const answerCount = 4;
      for (let j = 0; j < answerCount; j++) {
        await answers.nth(j).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor nibh vitae ante ullamcorper, ac consequat lorem convallis. Cras vel nibh a libero malesuada bibendum. Donec ullamcorper nulla non enim malesuada, at vulputate orci c.');
      }
    const answers2 = page.getByRole('button', { name: 'Delete this answer' });
    const answers2Count = 4;
    for (let n = 0; n < answers2Count; n ++) {
      await answers2.nth(0).click();
    }
    const answers3 = page.getByRole('button', { name: 'Add another answer' });
    const answers3Count = 4;
    for (let k = 0; k < answers3Count; k++) {
      await answers3.nth(0).click();
    }
  const answers4 = page.locator('.nested-form-wrapper.mb-4 .ql-editor');
  const answers4Count = 8;
  for (let d = 4; d < answers4Count; d ++) {
    await answers4.nth(d).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor nibh vitae ante ullamcorper, ac consequat lorem convallis. Cras vel nibh a libero malesuada bibendum. Donec ullamcorper nulla non enim malesuada, at vulputate orci c.');
    await answers4.nth(d).press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold' }).nth(d - 4).click();
    await page.getByRole('button', { name: 'Underline' }).nth(d - 4).click();
    await page.getByRole('button', { name: 'Italic' }).nth(d - 4).click();
    await page.getByRole('button', { name: 'Subscript' }).nth(d - 4).click();
    await page.getByRole('button', { name: 'Superscript' }).nth(d - 4).click();
  }
    await page.getByRole('checkbox', { name: 'a' }).check();
    await page.getByLabel('b', { exact: true }).check();
    await page.getByLabel('c', { exact: true }).check();
    await page.getByLabel('d', { exact: true }).check();
    await page.getByRole('slider').fill('241');
    await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').first().click();
    await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').nth(1).dblclick();
    await page.getByRole('slider').fill('0');
    await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').nth(1).click();
    await page.getByRole('slider').fill('295');
    await page.locator('#question_form div').filter({ hasText: 'Video hint 00:00 04:55' }).getByRole('button').first().click();
    await page.getByRole('button', { name: 'Save' }).click();
  }
  );

  // Think : Open Answer question 
  test('Function5: Open Answer question', async () => {
    await page.getByRole('link', { name: 'Open Answer Question' }).click();
    await page.getByLabel('Question Text').click();
    await page.getByLabel('Question Text').fill('Open Test Question');
    await page.getByRole('button', { name: 'Save' }).click();
    await page.reload();
  });
  
  // Think : Delete questions
  test('Function6: Delete questions', async () => {
    const deleteCount = 9;
    for (let i = 0; i < deleteCount; i++) {
      page.once('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept();
      });
      await page.getByRole('button', { name: 'Delete this question' }).nth(i - 9).click();
    }
    await page.reload();
  });

  // Dig Deeper
  test('Function7: Dig Deeper', async () => {
    await page.getByRole('link', { name: 'Ice cream has nourished and' }).click();
    await page.getByText('Ice cream has nourished and').nth(1).click();
    await page.locator('.ql-editor').press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold' }).click();
    await page.getByRole('button', { name: 'Underline' }).click();
    await page.getByRole('button', { name: 'Italic' }).click();
    await page.getByRole('button', { name: 'Link' }).click();
    await page.getByRole('button', { name: 'Image' }).click();
    await page.getByRole('button', { name: 'Subscript' }).click();
    await page.getByRole('button', { name: 'Superscript' }).click();
    await page.getByRole('button', { name: 'Preview' }).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.locator('#some-form').getByRole('paragraph').evaluateAll(paragraphs => {
      paragraphs.forEach(paragraph => {
          paragraph.textContent = 'Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis.';
      });
    });
    await page.getByRole('button', { name: 'Save' }).click();
  });
  
  // Discuss
  test('Function8: Discuss', async () => {
    await page.getByRole('link', { name: '1. Do you think food is a' }).click();
    await page.getByLabel('Prompt').click();
    await page.getByLabel('Prompt').press('ControlOrMeta+a');
    await page.getByLabel('Prompt').fill('Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet fe.');
    await page.locator('.ql-editor').click();
    await page.locator('.ql-editor').fill('Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet fe.');
    await page.getByText('Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet fe.').click();
    await page.locator('div').filter({ hasText: /^Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet fe.$/ }).nth(1).press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold' }).click();
    await page.getByRole('button', { name: 'Underline' }).click();
    await page.getByRole('button', { name: 'Italic' }).click();
    await page.getByRole('button', { name: 'Link' }).click();
    await page.getByRole('button', { name: 'Subscript' }).click();
    await page.getByRole('button', { name: 'Superscript' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('link', { name: 'Add discussion' }).click();
    await page.getByLabel('Prompt').click();
    await page.getByLabel('Prompt').fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempore. ');
    await page.locator('#modal').getByRole('paragraph').click();
    await page.locator('.ql-editor').fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempore. ');
    await page.locator('.ql-editor').press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold' }).click();
    await page.getByRole('button', { name: 'Underline' }).click();
    await page.getByRole('button', { name: 'Italic' }).click();
    await page.getByRole('button', { name: 'Link' }).click();
    await page.getByRole('button', { name: 'Subscript' }).click();
    await page.getByRole('button', { name: 'Superscript' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Exclude this discussion' }).nth(0).click();
    page.once('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Delete this discussion' }).nth(0).click();
    await page.getByRole('button', { name: 'Exclude this discussion' }).nth(0).click();
    page.once('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept();
    });
    await page.getByRole('button', { name: 'Delete this discussion' }).nth(0).click();
  });

  // And Finally
  test('Function9: And Finally', async () => {
    await page.getByRole('button', { name: 'And Finally…' }).click();
    await page.getByRole('link', { name: 'Input information' }).click();
    await page.locator('.ql-editor').click();
    await page.locator('#some-form div').getByRole('paragraph').nth(0).fill('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor nibh vitae ante ullamcorper, ac consequat lorem convallis. Cras vel nibh a libero malesuada bibendum. Donec ullamcorper nulla non enim malesuada, at vulputate orci congue. Nam ac arcu felis. Proin vitae dui sed orci convallis suscipit. Integer luctus, erat at vulputate gravida, eros nunc interdum neque, eget fringilla nunc nulla et risus. Nullam vulputate dictum augue, sit amet convallis lacus vulputate a. Integer finibus turpis nec quam feugiat, vel eleifend nisi fermentum. Donec a augue massa. Nullam in venenatis leo. Donec nec quam a velit tempor dignissim. Aenean ultricies elit nec mi fermentum, non accumsan orci venenatis. Aenean ac convallis ex, at sagittis lectus. Vestibulum auctor justo vitae enim suscipit condimentum.Phasellus et lacus ac purus lacinia fermentum. Suspendisse dictum, mauris et pretium fermentum, risus ex aliquam arcu, nec tempor nunc elit a lorem. Pellentesque id nunc quam.testtestesteste');
    await page.locator('#some-form div').filter({ hasText: 'Lorem ipsum dolor sit amet,' }).nth(0).press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold' }).click();
    await page.getByRole('button', { name: 'Underline' }).click();
    await page.getByRole('button', { name: 'Italic' }).click();
    await page.getByRole('button', { name: 'Link' }).click();
    await page.getByRole('button', { name: 'Image' }).click();
    await page.getByRole('button', { name: 'Subscript' }).click();
    await page.getByRole('button', { name: 'Superscript' }).click();
    await page.getByRole('button', { name: 'Preview' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
  });

  // Change video
  test('Function10: Change video', async () => {
    await page.getByRole('link', { name: 'Change video' }).click();
    await page.getByLabel('YouTube URL or ID').click();
    await page.getByLabel('YouTube URL or ID').fill('7K3KdgDcdYctesttesttest');
    await page.getByRole('button', { name: 'Save' }).click();
    const errorMessage = page.locator('text=Your lesson could not be submitted. Please correct the errors below.');
    await expect(errorMessage).toBeVisible();
    await page.getByLabel('YouTube URL or ID').click();
    await page.getByLabel('YouTube URL or ID').fill('7K3KdgDcdYc');
    await page.getByLabel('YouTube URL or ID').click();
    await page.getByRole('button', { name: 'Save' }).click();
  });

  //Crop video
  test('Function11: Crop video', async () => {
    await page.getByRole('link', { name: 'Crop video' }).click();
    await page.getByRole('slider').first().fill('73');
    await page.getByRole('slider').nth(1).fill('142');
    await page.getByRole('slider').first().fill('0');
    await page.getByRole('slider').nth(1).fill('295');
    await page.locator('.grid > button:nth-child(4)').first().click();
    await page.locator('.grid > button:nth-child(4)').first().click();
    await page.locator('.w-\\[42px\\]').first().click();
    await page.locator('.w-\\[42px\\]').first().click();
    await page.locator('.w-\\[170px\\] > .grid > button').first().click();
    await page.locator('.w-\\[170px\\] > .grid > button').first().click();
    await page.locator('.w-\\[170px\\] > .grid > button:nth-child(4)').click();
    await page.locator('.w-\\[170px\\] > .grid > button:nth-child(4)').click();
    await page.getByRole('button', { name: 'Save' }).click();
  });

  // Settings
  test('Function12: Settings', async () => {
    await page.getByRole('link', { name: 'Off' }).click();
    await page.getByLabel('Think').uncheck();
    await page.getByLabel('Dig Deeper').uncheck();
    await page.getByLabel('Discuss').uncheck();
    await page.getByLabel('And Finally...').uncheck();
    await page.getByLabel('Think').check();
    await page.getByLabel('Dig Deeper').check();
    await page.getByLabel('Discuss').check();
    await page.getByLabel('And Finally...').check();
    await page.getByLabel('Make my lesson customizable').check();
    await page.getByLabel('Don\'t require students to use').check();
    await page.getByRole('button', { name: 'Save' }).click();
  });

  // Status + Get help
  test('Function13: Status + Get help', async () => {
    await page.locator('.text-base > .inline-flex').click();
    await page.getByLabel('Close Modal').click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Get help' }).click();
    const page1 = await page1Promise;
  });

  // Preview + Summary + Settings
  test('Function14: Preview + Summary + Settings', async () => {
    await page.locator('.flex-shrink-0 > .appearance-none').click();
    await page.locator('li').filter({ hasText: 'Preview' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'Preview' }).click();
    const page1 = await page1Promise;
    await page1.close();
    await page.getByRole('link', { name: 'View summary' }).click();
    await page.getByLabel('Close Modal').click();
    await page.locator('.flex-shrink-0 > .appearance-none').click();
    await page.getByRole('link', { name: 'Adjust settings' }).click();
    await page.getByRole('button', { name: 'Cancel' }).click();
    await page.locator('.flex-shrink-0 > .appearance-none').click();
    page.once('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.dismiss();
    });
    await page.getByRole('link', { name: 'Delete lesson' }).click();
  });

  // Publish
  test('Function15: Publish', async () => {
    await page.getByRole('button', { name: 'Publish' }).click();
    await page.getByLabel('Don\'t require students to use').check();
    await page.getByRole('link', { name: 'Lessons', exact: true }).click({
      modifiers: ['ControlOrMeta']
    });
    await page.getByRole('link', { name: 'See your lesson »' }).click({
      modifiers: ['ControlOrMeta']
    });
    await page.getByRole('link', { name: 'Learn more about student' }).click({
      modifiers: ['ControlOrMeta']
    });
    await page.getByRole('button', { name: 'Share your lesson' }).click();
    await page.getByLabel('Copy link to clipboard').click();
    await page.getByPlaceholder('Separate email addresses by').click();
    await page.getByPlaceholder('Separate email addresses by').fill('sofiia.trefilova@sysgears.com');
    await page.getByRole('button', { name: 'Send' }).click();
    await page.waitForSelector('text=Invitations sent!');
  });
});